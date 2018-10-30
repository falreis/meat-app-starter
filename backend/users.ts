export class User{
    constructor(public email: string
        , public name: string
        , private password: string
    ){}

    matches(another: User): boolean{
        return (another !== undefined
            && another.email === this.email
            && another.password === this.password
        )
    }
}

export const users : {[key:string]: User} = {
    "falreis@gmail.com": new User('falreis@gmail.com', 'Felipe', '123456'),
    "felipe@gmail.com": new User('felipe@gmail.com', 'Felipe2', '123456')
}
