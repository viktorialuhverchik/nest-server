"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const story_entity_1 = require("./entity/story.entity");
let StoryService = class StoryService {
    constructor(storyRepository) {
        this.storyRepository = storyRepository;
    }
    findAll() {
        return this.storyRepository.find({
            relations: ['genre', 'tags', 'chapters', 'user', 'rating']
        });
    }
    findOne(id) {
        return this.storyRepository.findOne({
            relations: ['genre', 'tags', 'chapters', 'user', 'rating', 'comments', 'comments.user'],
            where: {
                id: id
            }
        });
    }
    getStoriesByUserId(id) {
        return this.storyRepository.find({
            relations: ['genre', 'tags', 'chapters', 'user', 'rating'],
            where: {
                user: {
                    id: id
                }
            }
        });
    }
    async create(story) {
        return this.storyRepository.save(story);
    }
    async deleteStory(storyId) {
        await this.storyRepository
            .createQueryBuilder('story')
            .delete()
            .where("id = :storyId", { storyId })
            .execute();
    }
};
StoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(story_entity_1.Story)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StoryService);
exports.StoryService = StoryService;
//# sourceMappingURL=story.service.js.map