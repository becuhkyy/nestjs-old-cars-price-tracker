import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(private readonly reportsRepository: Repository<Report>) {}

  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  findAll() {
    const reports = this.reportsRepository.find();

    if (!reports) {
      throw new NotFoundException('No reports found');
    }

    return reports;
  }

  findOne(id: number) {
    const report = this.reportsRepository.findOne({ where: { id } });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    return report;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
