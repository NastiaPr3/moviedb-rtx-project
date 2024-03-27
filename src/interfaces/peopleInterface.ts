export interface IPerson {
    known_for_department: string
    name: string,
    character: string
    profile_path: string,
    cast_id: number,
    job: string,
    id: number
}

export interface IPeople<T> {
    id: number,
    original_title: string,
    credits: {
        cast: T[],
        crew: T[]
    }
}