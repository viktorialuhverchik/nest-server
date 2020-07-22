"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const story_controller_1 = require("./story.controller");
const story_entity_1 = require("./entity/story.entity");
const story_service_1 = require("./story.service");
const genre_entity_1 = require("./entity/genre.entity");
const chapter_entity_1 = require("./entity/chapter.entity");
const tag_entity_1 = require("./entity/tag.entity");
const genre_controller_1 = require("./genre/genre.controller");
const tag_controller_1 = require("./tag/tag.controller");
const genre_service_1 = require("./genre/genre.service");
const tag_service_1 = require("./tag/tag.service");
let StoryModule = class StoryModule {
};
StoryModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([
                story_entity_1.Story, genre_entity_1.Genre, chapter_entity_1.Chapter, tag_entity_1.Tag
            ])],
        controllers: [story_controller_1.StoryController, genre_controller_1.GenreController, tag_controller_1.TagController],
        providers: [story_service_1.StoryService, genre_service_1.GenreService, tag_service_1.TagService],
        exports: []
    })
], StoryModule);
exports.StoryModule = StoryModule;
//# sourceMappingURL=story.module.js.map