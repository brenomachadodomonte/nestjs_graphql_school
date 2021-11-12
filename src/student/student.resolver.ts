import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Student } from "./student.entity";
import { CreateStudentInput } from "./student.input";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(of => StudentType)
export class StudentResolver {

    constructor(private readonly service: StudentService){}

    @Mutation(returns => StudentType)
    createStudent(
        @Args('createStudentInput') input: CreateStudentInput
    ) : Promise<Student> {
        return this.service.createStudent(input);
    }
}