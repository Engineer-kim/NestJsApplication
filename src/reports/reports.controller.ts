import { Body, Controller , Post ,UseGuards , Patch, Param } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/reports.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor'
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('reports')
export class ReportsController {
    constructor(private reportService: ReportsService) {

    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReports(@Body() body: CreateReportDto, @CurrentUser() user: User){
        return this.reportService.create(body , user)
    }


    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto){
        return this.reportService.changeApproval(id , body.approved)
    }

}
