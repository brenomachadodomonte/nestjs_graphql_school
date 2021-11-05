import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(Lesson)
        private repository: Repository<Lesson>
    ){}

    createLesson(name: string, startDate: string, endDate: string): Promise<Lesson> {
        const lesson = this.repository.create({
            id: uuid(),
            name, 
            startDate, 
            endDate
        });

        return this.repository.save(lesson);
    }

    getLesson(id: string): Promise<Lesson> {
        return this.repository.findOne({ where: { id } });
    }

}
