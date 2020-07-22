import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
    BeforeInsert, BeforeUpdate
} from 'typeorm';
import { Genre } from "./genre.entity";
import { Chapter } from "./chapter.entity";
import { Tag } from "./tag.entity";
import { User } from "../../user/entity/user.entity";

@Entity()
export class Story {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    heading: string;

    @Column({ length: 500 })
    description: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(type => Genre, genre => genre.stories)
    @JoinTable()
    genre: Genre;

    @OneToMany(type => Chapter, chapter => chapter.story)
    chapters: Chapter[];

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];

    @ManyToOne(type => User, user => user.stories)
    user: User;

    @BeforeInsert()
    setCreatedAt() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    hashPassword() {
        this.updatedAt = new Date();
    }
}