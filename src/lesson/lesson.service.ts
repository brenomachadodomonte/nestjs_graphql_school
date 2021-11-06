import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(Lesson)
        private repository: Repository<Lesson>
    ){}

    createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate } = createLessonInput;
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

    getLessons(): Promise<Lesson[]> {
        return this.repository.find();
    }
}
