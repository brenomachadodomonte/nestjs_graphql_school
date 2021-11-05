import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(LessonRepository)
        private repository: LessonRepository
    ){}

    createLesson(name: string, startDate: string, endDate: string) {
        const lesson = this.repository.create({
            name, startDate, endDate
        });

        
    }
}
