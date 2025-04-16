import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
 
@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report) private repo: Repository<Report>
    ){}

    createEstimate({ make, model, year, lng, lat ,mileage }: GetEstimateDto) {
        return this.repo.createQueryBuilder()  //빌더 객체를 반환
            .select('AVG(price)', 'price') //average price 집계 함수 결과를 price라는 이름으로 반환
            .where('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('year = :year', { year })
            .andWhere('lng - :lng BETWEEN -5 AND 5', { lng }) //위도 경도 차이 5도 이내
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('approved IS TRUE')  //andWhere => 단순히 웨어 조건을 추가하는 것
            .orderBy('ABS(mileage - :mileage)', 'DESC') //mileage 차이의 절대값(양수)을 기준으로 내림차순 정렬
            .setParameters({ mileage })
            .limit(3)
            .getRawOne()
            //createQueryBuilder 쿼리 정의후 실행시 Promise 객체 반환 (메소드 체이닝으로 then , Catch 사용가능)
    }
    
    create(reportDto: CreateReportDto , user: User){
        const report = this.repo.create(reportDto)
        report.user = user
        return this.repo.save(report)
    }


    async changeApproval(id: string , approved: boolean){
        const report = await this.repo.findOne({ 
            where: { id: parseInt(id) } 
        });
        if(!report){
           throw new NotFoundException("Request Report Data is Not Found")
        }

        report.approved = approved
        return this.repo.save(report)
    }

}
