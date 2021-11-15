import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { StudentService } from "src/student/student.service";
import { AssignStudentsToLessonInput } from "./assign-students-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(
        private readonly service: LessonService,
        private readonly studentService: StudentService
    ){}

    @Query(returns => [LessonType])
    lessons(): Promise<Lesson[]> {
        return this.service.getLessons();
    }

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string
    ): Promise<Lesson> {
        return this.service.getLesson(id);
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ): Promise<Lesson>{
        return this.service.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLessonInput') input: AssignStudentsToLessonInput
    ) : Promise<LessonType> {
        return this.service.assignStudentToLesson(input);
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson){
        return this.studentService.studentsByIds(lesson.students);
    }
}