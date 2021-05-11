import axios from 'axios'

export const register = newUser => {
    return axios
        .post('http://localhost:5000/users/register', {
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log("Registered!", res)
            return res
        })
        .catch(err => {
            console.log(err.response)
            return err.response.status
        })
}

// export const addStatistic = newStatistic => {
//     return axios
//         .post('http://localhost:5000/statistics/addStatistic', {
//             userId: newStatistic.userId,
//             chapter: newStatistic.chapter,
//             date: newStatistic.date,
//             corectAnswers: newStatistic.corectAnswers,
//             totalQuestions:newStatistic.totalQuestions,
//             percentage:newStatistic.percentage,
//         })
//         .then(res => {
//             console.log("ADD STATISTIC CALLED")
//             return res.status
//         })
//         .catch(err => {
//             console.log(err.response)
//             return err.response
//         })
// }
export const getPatientsNames = () => {
    return axios
        .get('http://localhost:5000/patients/getPatients', {})
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getNursesNames = () => {
    return axios
        .get('http://localhost:5000/userDetails/getNurses', {})
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getDrugs = () => {
    return axios
        .get('http://localhost:5000/drugs/getDrugs', {})
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getDoctorsNames = () => {
    return axios
        .get('http://localhost:5000/userDetails/getDoctors', {})
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getDoctorsDetails = () => {
    return axios
        .get('http://localhost:5000/userDetails/getDoctorsDetails', {})
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getPatientsForUser = user => {
    console.log("USER HERE: " + user)
    return axios
        .get('http://localhost:5000/patients/getPatientsBy',
            { params: { userID: user } })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getPatientDoctorList = patientDetails => {
    console.log("USER HERE: " + patientDetails)
    return axios
        .get('http://localhost:5000/patients/getPatientDoctorList',
            { params: { userID: patientDetails } })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getVisitsCreatedByUser = user => {
    console.log("USER HERE: " + user)
    return axios
        .get('http://localhost:5000/visits/getVisitsCreateByUser',
            { params: { userID: user } })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getVisitsForUser = user => {
    console.log("USER HERE: " + user)
    return axios
        .get('http://localhost:5000/visits/getVisitsForUser',
            { params: { userID: user } })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}




export const deleteVisit = _id => {
    console.log("USER HERE: " + _id)
    return axios
        .delete('http://localhost:5000/visits/deleteVisit',
            { params: { _id: _id } })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const modifyUserPhoto = (image, userID) => {
    console.log("USER HERE: " + image)
    return axios
        .put('http://localhost:5000/userDetails/modifyImage',
            {
                newImage: image[0],
                userID: userID
            })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })


}
export const modifyAddress = address => {
    console.log("USER HERE: ", address)
    return axios
        .put('http://localhost:5000/userDetails/modifyAddress',
            {
                country: address.country,
                city: address.city,
                street: address.street,
                postalCode: address.postalCode,
                adrLine: address.adrLine,
                userID: address.userID,
            }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const modifyCom = commDetails => {
    console.log("USER HERE: ", commDetails)
    return axios
        .put('http://localhost:5000/userDetails/modifyCommunication',
            {
                fix: commDetails.fix,
                fax: commDetails.fax,
                phone: commDetails.phone,
                userID: commDetails.userID,
            }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const modifyGeneralData = genData => {
    console.log("USER HERE: ", genData)
    return axios
        .put('http://localhost:5000/userDetails/modifyGeneralData',
            {
                firstName: genData.firstName,
                lastName: genData.lastName,
                dateOfBirth: genData.dateOfBirth,
                gender: genData.gender,
                specialization: genData.specialization,
                experience: genData.experience,
                userID: genData.userID,
            }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}


export const modifyVisit = visit => {
    console.log("USER HERE: ", visit)
    return axios
        .put('http://localhost:5000/visits/modifyVisit',
            {
                id: visit.id,
                title: visit.title,
                startDate: visit.startDate,
                endDate: visit.endDate,
                nurseID: visit.nurseID,
                patientID: visit.patientID,
                clinicVisit: visit.clinicVisit,
                patientVisit: visit.patientVisit,
                address: visit.address
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}
export const getUserProfilePhoto = user => {

    return axios
        .get('http://localhost:5000/userDetails/getUserPhoto',
            { params: { userID: user } }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getUserDetails = user => {
    console.log("USER FOR PHOTO: " + user)
    return axios
        .get('http://localhost:5000/userDetails/getUserDetails',
            { params: { userID: user } }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getPatientAddressByID = userID => {
    console.log("GET PATIENT VISIT BY ID")
    return axios
        .get('http://localhost:5000/patients/getPatientAddressByID',
            { params: { patientID: userID } }
        )
        .then(res => {
            console.log("ADD visit CALLED")
            return res.data
        })
        .catch(err => {
            console.log(err.response)
            return err.response
        })
}

export const addVisits = visit => {
    return axios
        .post('http://localhost:5000/visits/createVisit', {
            createdBy: visit.createdBy,
            doctorID: visit.createdBy,
            patientID: visit.patientID,
            title: visit.title,
            startDate: visit.startDate,
            endDate: visit.endDate,
            nurseID: visit.nurseID,
            clinicVisit: visit.clinicVisit,
            patientVisit: visit.patientVisit,
            address: visit.address
        })
        .then(res => {
            console.log("ADD visit CALLED")
            return res.data
        })
        .catch(err => {
            console.log(err.response)
            return err.response
        })
}




export const addDrugsToTH = details => {
    console.log("USER HERE: ", details)
    return axios
        .put('http://localhost:5000/treatmenthistory/addDrugsToTH',
            {
                drugs: details.drugs,
                treatmentID: details.treatmentID,
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}


export const createHT = treatHist => {
    return axios
        .post('http://localhost:5000/treatmenthistory/createHT', {
            doctorId: treatHist.doctorId,
            name: treatHist.name,
            description: treatHist.description,
            notes: treatHist.notes,
            current: treatHist.current,
            createdBy: treatHist.createdBy,
            createdOn: treatHist.createdOn,
        })
        .then(res => {
            console.log("ADD visit CALLED")
            return res
        })
        .catch(err => {
            console.log(err.response)
            return err.response
        })
}

export const addPatientDetails = patientDetails => {
    return axios
        .post('http://localhost:5000/patients/createPD', {
            userID: patientDetails.userID,
            firstName: patientDetails.firstName,
            lastName: patientDetails.lastName,
            dateOfBirth: patientDetails.dateOfBirth,
            gender: patientDetails.gender
        })
        .then(res => {
            console.log("ADD visit CALLED")
            return res
        })
        .catch(err => {
            console.log(err.response)
            return err.response
        })
}

export const modifyAddressPD = address => {
    console.log("USER HERE: ", address)
    return axios
        .put('http://localhost:5000/patients/modifyAddress',
            {
                patientDetailsID: address.patientDetailsID,
                country: address.country,
                city: address.city,
                street: address.street,
                postalCode: address.postalCode,
                adrLine: address.adrLine,
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}


export const modifyCM = details => {
    console.log("USER HERE: ", details)
    return axios
        .put('http://localhost:5000/patients/modifyCM',
            {
                patientDetailsID: details.patientDetailsID,
                phone: details.phone,
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}



export const addNotes = details => {
    console.log("USER HERE: ", details)
    return axios
        .put('http://localhost:5000/patients/addNotes',
            {
                patientDetailsID: details.patientDetailsID,
                note: details.note,
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}

export const modifyMedicalStaff = details => {
    console.log("USER HERE: ", details)
    return axios
        .put('http://localhost:5000/patients/modifyMedicalStaff',
            {
                patientDetailsID: details.patientDetailsID,
                nurses: details.nurses,
                doctors: details.doctors,
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}

export const modifyIllness = details => {
    console.log("USER HERE: ", details)
    return axios
        .put('http://localhost:5000/patients/modifyIllness',
            {
                patientDetailsID: details.patientDetailsID,
                illness: details.illness,
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}
export const addPatientDoctors = details => {
    console.log("USER HERE: ", details)
    return axios
        .put('http://localhost:5000/patients/addPatientDoctors',
            {
                patientDetailsID: details.patientDetailsID,
                doctors: details.doctors,
            }
        )
        .then(res => {
            return res
        })
        .catch(err => {
            return err.response.status
        })
}

export const removeDoctorForPatient = details => {
    console.log("USER HERE: ", details)
    return axios
        .put('http://localhost:5000/patients/removeDoctorForPatient',
            {
                patientDetailsID: details.patientDetailsID,
                doctor: details.doctor,
            }
        )
        .then(res => {
            return res
        })
        .catch(err => {
            return err.response.status
        })
}




export const addTreatmentID = details => {
    console.log("USER HERE: ", details)
    return axios
        .put('http://localhost:5000/patients/addPatientTreatment',
            {
                patientDetailsID: details.patientDetailsID,
                treatmentID: details.treatmentID,
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}

export const login = user => {
    return axios
        .post('http://localhost:5000/users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data);

            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}

// export const profile = user => {
//     console.log("USER: ", user)
//     var config = {
//         headers: {'authorization':localStorage.getItem('usertoken')}
//     };

//     return axios
//         .post('users/profile', {
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email,
//             password: user.password,
//             title: user.title,
//             birthday: user.birthday

//         },config)
//         .then(res => {
//             console.log(res)
//             localStorage.setItem('usertoken', res.data)
//             return res.status
//         })
//         .catch(err => {
//             console.log(err.response)
//             return err.response
//         })
// } 

// export const getExercises = (difficulty, subch) => {
//     return axios
//         .post('http://localhost:5000/exercises/getExercises/' + difficulty, {
//                 subchapter: subch
//         })
//         .then(res => {
//             console.log("asdadasdadAS", res.data)
//             return res.data
//         })
//         .catch(err => {
//             console.log(err.response);
//             return err.response
//         })
// }
// export const getEasyQuiz = (subch) => {
//     return axios
//         .post('http://localhost:5000/exercises/getEasyQuiz', {
//                 subchapter: subch,
//         })
//         .then(res => {
//             console.log("EASYYY QUIZZZZZZZZZZZ")
//             return res.data
//         })
//         .catch(err => {
//             console.log(err.response);
//             return err.response
//         })
// }

// export const getMediumQuiz = (subch) => {
//     return axios
//         .post('http://localhost:5000/exercises/getMediumQuiz', {
//                 subchapter: subch,
//         })
//         .then(res => {
//             console.log("MEDIUM QUIZZZZZZZZZZZ")
//             return res.data
//         })
//         .catch(err => {
//             console.log(err.response);
//             return err.response
//         })
// }


// export const getHardQuiz = (subch) => {
//     return axios
//         .post('http://localhost:5000/exercises/getHardQuiz', {
//                 subchapter: subch,
//         })
//         .then(res => {
//             console.log("HARDDDDD QUIZZZZZZZZZZZ")
//             return res.data
//         })
//         .catch(err => {
//             console.log(err.response);
//             return err.response
//         })
// }


// export const getEmotions = (picture) => {
//     console.log(picture);
//     var picturetoSed = Buffer.from(picture, 'base64');
//     var config = {
//         headers: { 'Ocp-Apim-Subscription-Key': 'b8ed8b4b987f40439d4b63306363c6c5', 'Content-Type' : 'application/octet-stream' }
//     };

//     return axios
//     .post('https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion' , picturetoSed, config, {
//     })
//     .then(res => {
//         console.log("data log: ", res.data)
//         console.log("data log: ", res.data[0].faceAttributes.emotion)
//         return  res.data[0].faceAttributes.emotion
//     })
//     .catch(err => {
//         console.log(err.response)
//         return err.response
//     })


// }

// export const getProgress = (userId) => {
//     return axios
//         .post('http://localhost:5000/progress/getProgress/' + userId, {
//         })
//         .then(res => {
//             console.log("asdadasdadAS", res.data)
//             return res.data
//         })
//         .catch(err => {
//             console.log(err.response)
//             return err.response
//         })
// }


// export const addProgress = newProgress => {
//     return axios
//         .post('http://localhost:5000/progress/addProgress', {
//             userId: newProgress.userId,
//             chapter: newProgress.chapter,
//             completed: newProgress.completed
//         })
//         .then(res => {
//             console.log("ADD Progress CALLED")
//             return res.status
//         })
//         .catch(err => {
//             console.log(err.response)
//             return err.response
//         })
// }

// export const addExercise = newExercise => {
//     return axios
//         .post('http://localhost:5000/exercises/addExercise', {
//             question: newExercise.question,
//             subchapter: newExercise.subchapter,

//             answer1 : {
//                 description: newExercise.answer1.description,
//                 isCorrect: newExercise.answer1.isCorrect
//             },

//             answer2 : {
//                 description: newExercise.answer2.description,
//                 isCorrect: newExercise.answer2.isCorrect
//             },

//             answer3 : {
//                 description: newExercise.answer3.description,
//                 isCorrect: newExercise.answer3.isCorrect
//             },

//             answer4 : {
//                 description: newExercise.answer4.description,
//                 isCorrect: newExercise.answer4.isCorrect
//             },

//             explanation: newExercise.explanation,
//             difficulty: newExercise.difficulty
//         })
//         .then(res => {
//             console.log("ADD Exercise CALLED")
//             console.log("res.status")
//             return res.status
//         })
//         .catch(err => {
//             console.log(err.response)
//             return err.response
//         })
// }

// export const getStatistics = (userId) => {
//     return axios
//         .post('http://localhost:5000/statistics/getStatistics/' + userId, {
//         })
//         .then(res => {
//             console.log("asdadasdadAS", res.data)
//             return res.data
//         })
//         .catch(err => {
//             console.log(err.response)
//             return err.response
//         })
// }

// export const getAllStatistics = (chp) => {
//     return axios
//         .post('http://localhost:5000/statistics/getAllStatistics/'  , {
//             chapter: chp,
//         })
//         .then(res => {
//             console.log("asdadasdadAS", res.data)
//             return res.data
//         })
//         .catch(err => {
//             console.log(err.response)
//             return err.response
//         })
// }