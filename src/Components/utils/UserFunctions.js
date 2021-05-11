import axios from 'axios'


// USERS
// POST
export const register = newUser => {
    return axios
        .post('http://localhost:5000/users/register', {
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            return res
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

            return res
        })
        .catch(err => {
            return err.response.status
        })
}


// PATIENTS
// GET
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

export const getPatientsForUser = (user, accessLvl) => {
    console.log("US ", user + " acc" + typeof(accessLvl))
    return axios
        .get('http://localhost:5000/patients/getPatientsBy',
            { params: { userID: user, accessLvl : accessLvl} })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getPatientDoctorList = patientDetails => {
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

export const getPatientAddressByID = userID => {
    return axios
        .get('http://localhost:5000/patients/getPatientAddressByID',
            { params: { patientID: userID } }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response
        })
}

// POST
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
            return res
        })
        .catch(err => {
            return err.response
        })
}

// PUT
export const modifyAddressPD = address => {
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
    return axios
        .put('http://localhost:5000/patients/removeDoctorForPatient',
            {
                patientDetailsID: details.patientDetailsID,
                user: details.user,
                lvlAccess: details.lvlAccess
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


// USER DETAILS
// get
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

// PUT
export const modifyUserPhoto = (image, userID) => {
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



// DRUGS
// GET
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


// VISITS
// GET
export const getVisitsCreatedByUser = user => {
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

export const getVisitsForUser = (user, accessLvl) => {
    return axios
        .get('http://localhost:5000/visits/getVisitsForUser',
            { params: { userID: user, accessLvl: accessLvl } })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

// DELETE
export const deleteVisit = _id => {
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

// PUT
export const modifyVisit = visit => {
    return axios
        .put('http://localhost:5000/visits/modifyVisit',
            {
                id: visit.id,
                title: visit.title,
                startDate: visit.startDate,
                endDate: visit.endDate,
                nurseID: visit.nurseID,
                doctorID: visit.doctorID,
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

// POST
export const addVisits = visit => {
    return axios
        .post('http://localhost:5000/visits/createVisit', {
            createdBy: visit.createdBy,
            doctorID: visit.doctorID,
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
            return res.data
        })
        .catch(err => {
            return err.response
        })
}


// TREATMENT HISTORY
// PUT
export const addDrugsToTH = details => {
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

// POST
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
            return res
        })
        .catch(err => {
            return err.response
        })
}


