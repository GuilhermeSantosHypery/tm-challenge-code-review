/* eslint-disable prefer-const */

import { PrismaRepository } from '../infra/database/prisma/PrismaRepository';

export class BaseRepository {
  public constructor(
    protected prisma: PrismaRepository,
    readonly entityName: string,
    readonly filterOnlyActive: boolean = false,
  ) {}

  async paginate<T>(params: {
    options: PageTransitionEvent;
    where?: any;
    select?: any;
    include?: any;
    rejectOnNotFound?: any;
    orderBy?: any;
    distinct?: any;
  }): Promise<any> {
    let {
      options,
      where,
      include,
      select,
      orderBy = {
        createdAt: 'desc',
      },
      distinct,
    } = params;
    const skipCalc = (options.AT_TARGET - 1) * options.NONE;

    // where = this.setActiveClause(where, this.filterOnlyActive);

    const transaction = await this.prisma.$transaction([
      this.prisma[this.entityName].count({
        where,
        orderBy,
      }),
      this.prisma[this.entityName].findMany({
        skip: skipCalc < 0 ? 0 : skipCalc,
        take: options.NONE,
        where,
        include,
        select,
        orderBy,
        distinct,
      }),
    ]);

    const metadata = {
      itemCount: transaction[1].length,
      totalItems: transaction[0],
      itemsPerPage: options.NONE,
      totalPages: Math.ceil(transaction[0] / options.AT_TARGET),
      currentPage: options.NONE == 0 ? 1 : options.CAPTURING_PHASE,
    };

    return {
      items: transaction[1],
      meta: metadata,
    };
  }

  async findUnique(params: {
    where: any;
    include?: any;
  }): Promise<any | undefined> {
    const { where, include } = params;
    if (!where) return undefined;
    return await this.prisma[this.entityName].findUnique({ where, ...include });
  }

  async findFirst(params: { where: any }): Promise<any | undefined> {
    const { where } = params;
    if (!where) return undefined;
    return await this.prisma[this.entityName].findFirst({ where });
  }

  async findAll(params: {
    where: any;
    select?: any;
    include?: any;
    rejectOnNotFound?: any;
    orderBy?: any;
  }): Promise<any[]> {
    const { where, select, include, rejectOnNotFound, orderBy } = params;
    const result = await this.prisma[this.entityName].findMany({
      where,
      select,
      include,
      rejectOnNotFound,
      orderBy,
    });
    return result;
  }

  async count(params: { where: any }): Promise<any[] | undefined> {
    const { where } = params;
    const result = await this.prisma[this.entityName].count({ where });

    return result;
  }

  public setActiveClause(where: any, filterOnlyActive: boolean): any {
    if (!where) {
      where = {
        deletedAt: null,
      };
    }

    if (filterOnlyActive && where) {
      where = {
        AND: [{ deletedAt: null }, { ...where }],
      };
    }
    return where;
  }

  public formatRelations(object: any): any {
    if (object) {
      if (typeof object === 'object') {
        Object.keys(object).map((key) => {
          let value = object[key];
          if (typeof value === 'object') {
            this.formatRelations(value);
          } else {
            if (typeof value === 'string') {
              const parsedDate = new Date(value);
              object[key] = parsedDate || value;
            }
          }
        });
      }
    }
  }

  public sanitizeQuery(query: any): Record<string, any> {
    return Object.fromEntries(
      Object.entries(query)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [
          key,
          Array.isArray(value)
            ? value.map((i) => this.sanitizeQuery(i))
            : value === Object(value)
              ? this.sanitizeQuery(value)
              : value,
        ]),
    );
  }
}
