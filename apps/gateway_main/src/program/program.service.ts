import { Injectable } from "@nestjs/common"
import { DTOCreateProgram } from "./program.dto.create"

@Injectable()
export class ProgramService {
  constructor() {}

  /**
   * Add new program
   *
   * @param { DTOCreateProgram } payload - Program data to create
   * @returns { void }
   */
  async create(payload: DTOCreateProgram): Promise<void> {
    //
  }

  async approve(): Promise<void> {}
}
