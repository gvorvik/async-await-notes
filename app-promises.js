const users = [{
    id: 1,
    name: 'Greg',
    schoolId: 123,
},{
    id: 2,
    name: 'Alex',
    schoolId: 999, 
}];

const grades = [{
    id: 1,
    schoolId: 123,
    grade: 81
}, {
    id: 2,
    schoolId: 999,
    grade: 100
}, {
    id: 3,
    schoolId: 999,
    grade: 94
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find(user => user.id === id);

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id ${id}`);
        }
    });
}

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId))
    });

}

const getStatus = (userId) => {
    let user;
    return getUser(userId)
        .then(tempUser => {
            user = tempUser;
            return getGrades(user.schoolId);
        })
        .then(grades => {
            let average = 0;
            if(grades.length > 0) {
                average = grades.map(grade => grade.grade).reduce((a, b) => a+b) / grades.length;
            }
            return `${user.name} has a ${average}% average in the class`;
        })
}

//async await

const getStatusAlt = async (userId) => {
    //without await, we'd get a promise back
    //with await, we get the actual value returned from the promise
    const user = await getUser(userId);
    const grades = await getGrades(user.schoolId);
    let average = 0;
    if(grades.length > 0) {
        average = grades.map(grade => grade.grade).reduce((a, b) => a+b) / grades.length;
    }
    return `${user.name} has a ${average}% average in the class`;
}

getStatusAlt(2).then((status) => {
    console.log(status);
}).catch(err => console.log(err));

// getStatus(1)
// .then(status => console.log(status))
// .catch(err => console.log(err));