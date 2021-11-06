import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(private readonly service: LessonService){}

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
}