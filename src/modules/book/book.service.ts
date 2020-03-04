import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { UserRepository } from '../user/user.repository';
import { status } from '../../shared/entity-status.enum';
import { ReadBookDto } from './dtos/read-book.dto';
import { plainToClass } from 'class-transformer';
import { Book } from './book.entity';
import { In } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { UpdateBookDto } from './dtos/update-book.dto';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(BookRepository)
        private readonly _bookRepository: BookRepository,
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
    ) {

    }

    async get(bookId: number): Promise<ReadBookDto> {

        if (bookId) {
            throw new BadRequestException('Debe ingresar el Id del libro!');
        }

        const book: Book = await this._bookRepository.findOne(bookId, {
            where: { status: status.ACTIVE },
        });

        if (!book) {
            throw new NotFoundException('El libro no existe!');
        }

        return plainToClass(ReadBookDto, book);

    }

    async getAll(bookId: number): Promise<ReadBookDto[]> {

        const books: Book[] = await this._bookRepository.find({
            where: { status: status.ACTIVE },
        });

        if (!books) {
            throw new NotFoundException('No se encontraron libros!');
        }

        return books.map(book => plainToClass(ReadBookDto, book));

    }

    async getBookByAuthor(authorId: number): Promise<ReadBookDto[]> {

        if (!authorId) {
            throw new BadRequestException('Debe indicar un Id para realizar la búsqueda');
        }

        const books: Book[] = await this._bookRepository.find({
            where: { status: status.ACTIVE, authors: In([authorId]) },
        });

        return books.map(book => plainToClass(ReadBookDto, book));
    }

    async create(book: Partial<CreateBookDto>): Promise<ReadBookDto> {
        const authors: User[] = [];

        for (const authorId of book.authors) {
            const authorExists = await this._userRepository.findOne(authorId, {
                where: { status: 'ACTIVE' },
            });

            if (!authorExists) {
                throw new NotFoundException(
                    `There's not an author with this Id: ${authorId}`,
                );
            }

            const isAuthor = authorExists.roles.some(
                (role: Role) => role.name === RoleType.AUTHOR,
            );

            if (!isAuthor) {
                throw new UnauthorizedException(
                    `El usuario ${authorId} no es un autor`,
                );
            }

            authors.push(authorExists);
        }

        const savedBook: Book = await this._bookRepository.save({
            name: book.name,
            description: book.description,
            authors,
        });

        return plainToClass(ReadBookDto, savedBook);
    }

    async createByAuthor(book: Partial<CreateBookDto>, authorId: number) {
        const author = await this._userRepository.findOne(authorId, {
            where: { status: 'INACTIVE' },
        });

        const isAuthor = author.roles.some(
            (role: Role) => role.name === RoleType.AUTHOR,
        );

        if (!isAuthor) {
            throw new UnauthorizedException(`El usuario ${authorId} no es un autor`);
        }

        const savedBook: Book = await this._bookRepository.save({
            name: book.name,
            description: book.description,
            author,
        });

        return plainToClass(ReadBookDto, savedBook);
    }

    async update(
        bookId: number,
        book: Partial<UpdateBookDto>,
        authorId: number,
    ): Promise<ReadBookDto> {
        const bookExists = await this._bookRepository.findOne(bookId, {
            where: { status: 'ACTIVE' },
        });

        if (!bookExists) {
            throw new NotFoundException('Este libro no existe');
        }

        const isOwnBook = bookExists.authors.some(author => author.id === authorId);

        if (!isOwnBook) {
            throw new UnauthorizedException(`El usuario no es autor del libro`);
        }

        const updatedBook = await this._bookRepository.update(bookId, book);
        return plainToClass(ReadBookDto, updatedBook);
    }

    async delete(bookId: number): Promise<void> {
        const bookExists = await this._bookRepository.findOne(bookId, {
            where: { status: 'ACTIVE' },
        });

        if (!bookExists) {
            throw new NotFoundException('This book does not exists');
        }

        await this._bookRepository.update(bookId, { status: 'INACTIVE' });
    }

}
