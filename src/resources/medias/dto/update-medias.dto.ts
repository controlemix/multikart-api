import { PartialType } from "@nestjs/mapped-types";
import { MediasDto } from "./medias.dto";

export class UpdateMediasDto extends PartialType(MediasDto) {}

