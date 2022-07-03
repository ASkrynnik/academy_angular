import { User } from './app/User'

export let usersMock: User[] = [
    {
        id: 1,
        firstname : "Leanne",
        lastname: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031"
    },
    {
        id: 2,
        firstname : "Max",
        lastname: "Grens",
        email: "Brenze@april.com",
        phone: "093-888-77-22"
    },
    {
        id: 3,
        firstname : "Boris",
        lastname: "Maxwel",
        email: "Maxwel@gmail.com",
        phone: "066-125-69-47"
    },
    {
        id: 4,
        firstname : "Anna",
        lastname: "Truper",
        email: "TAnn@yahoo.com",
        phone: "1-851-736-3108"
    }
];

export function updateUsers (newUsers: User[]) {
    usersMock = newUsers;
}