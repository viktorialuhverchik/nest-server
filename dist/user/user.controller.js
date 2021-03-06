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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const story_service_1 = require("../story/story.service");
const rating_service_1 = require("../story/rating/rating.service");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
let UserController = class UserController {
    constructor(userService, storyService, ratingService) {
        this.userService = userService;
        this.storyService = storyService;
        this.ratingService = ratingService;
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    async getUserStories(id) {
        let stories = await this.storyService.getStoriesByUserId(id);
        stories = await Promise.all(stories.map(async (story) => {
            let amount = 0;
            let ratings = await this.ratingService.findAllByStory(story);
            if (ratings) {
                ratings.forEach(rating => {
                    amount += rating.rating;
                });
            }
            else {
                ratings = [];
            }
            story.ratingAmount = amount / ratings.length;
            return story;
        }));
        return stories;
    }
    async updateUsersStatus(users, command) {
        try {
            await this.userService.updateUsersStatus(users, command);
            return true;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async deleteUsers(users) {
        try {
            await this.userService.deleteUsers(users);
            return true;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    common_1.Get(':id/stories'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserStories", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('update-status'),
    __param(0, common_1.Body('users')),
    __param(1, common_1.Body('command')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUsersStatus", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('delete'),
    __param(0, common_1.Body('users')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUsers", null);
UserController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        story_service_1.StoryService,
        rating_service_1.RatingService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map