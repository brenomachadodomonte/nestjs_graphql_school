import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Student } from 'src/student/student.entity';

@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(Lesson)
        private repository: Repository<Lesson>
    ){}

    createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = createLessonInput;
        const lesson = this.repository.create({
            id: uuid(),
            name, 
            startDate, 
            endDate,
            students
        });

        return this.repository.save(lesson);
    }

    getLesson(id: string): Promise<Lesson> {
        return this.repository.findOne({ where: { id } });
    }

    getLessons(): Promise<Lesson[]> {
        return this.repository.find();
    }

    async assignStudentToLesson(input: AssignStudentsToLessonInput): Promise<Lesson> {
        const {
            lessonId,
            studentsId
        } = input;
        const lesson = await this.getLesson(lessonId);
        lesson.students = [...lesson.students, ...studentsId];
        return this.repository.save(lesson);
    }
}
