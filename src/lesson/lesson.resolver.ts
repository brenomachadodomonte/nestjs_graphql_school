import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Lesson } from "./lesson.entity";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(private readonly service: LessonService){}

    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string
    ): Promise<Lesson> {
        return this.service.getLesson(id);
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('name') name: string,
        @Args('starDate') starDate: string,
        @Args('endDate') endDate: string,
    ): Promise<Lesson>{
        return this.service.createLesson(name, starDate, endDate);
    }
}