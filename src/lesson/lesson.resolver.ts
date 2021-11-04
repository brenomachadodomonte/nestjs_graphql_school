import { Mutation, Query, Resolver } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver {

    @Query(returns => LessonType)
    lesson() {
        return {
            id: 'abcdefghijklmnop',
            name: 'NestJs Class',
            startDate: (new Date()).toISOString(),
            endDate: (new Date()).toISOString()
        }
    }

    @Mutation(returns => LessonType)
    createLesson(){

    }
}