import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from "./entity/story.entity";

@Injectable()
export class StoryService {
    constructor(
        @InjectRepository(Story)
        private storyRepository: Repository<Story>,
    ) {}

    findAll(): Promise<Story[]> {
        return this.storyRepository.find(
            {
                relations: ['genre', 'tags', 'chapters', 'user']
            }
        );
    }

    findOne(id: number): Promise<Story> {
        return this.storyRepository.findOne(
            {
                relations: ['genre', 'tags', 'chapters', 'user'],
                where: {
                    id: id
                }
            }
        );
    }

    async create(story: Story): Promise<Story> {
        return this.storyRepository.save(story);
    }
}