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
export const getPatientTreatHistoryIDs = user => {
    console.log("HERE USER: ", user)
    return axios
        .get('http://localhost:5000/patients/getPatientTreatHistoryIDs',
            { params: { userID: user } }
        )
        .then(res => {

            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

export const getPatientsWithSameIllness = (severity, userID) => {
    console.log("HERE USER: ", severity)
    return axios
        .get('http://localhost:5000/patients/getPatientsWithSameIllness',
            { params: { illness: severity, userID: userID } }
        )
        .then(res => {
            let test = res.data.map(function (obj) {
                delete obj.gender;
                delete obj.gravityCode;
                delete obj.image;
                delete obj.notes;
                delete obj.address;
                delete obj.phone;
                delete obj.patientCode;
                obj.illnessString = ""
                obj.illness.forEach(function(illness){
                    obj.illnessString = obj.illnessString + illness +", "
                })
                 
                let firstName = obj.firstName;
                let lastName = obj.lastName;
                obj.name = firstName + " " + lastName;
                delete obj.firstName;
                delete obj.lastName;
                let id = obj._id;
                obj.id = id;
                delete obj._id
                let currentYear = new Date().getFullYear();
                let yearOfBirth = new Date(obj.dateOfBirth).getFullYear();
                obj.age = currentYear - yearOfBirth;
                delete obj.dateOfBirth;
                obj.doctorNames = "";
                obj.doctors.forEach(function (doctor) {
                    axios
                        .get('http://localhost:5000/userDetails/getUserName',
                            { params: { userID: doctor } }
                        )
                        .then(res => {
                            console.log("PLEASEE ", res.data)
                            obj.doctorNames = obj.doctorNames + res.data + "; "

                        })
                        .catch(err => {
                            return err.response.status
                        })

                })
                obj.nursesNames = "";
                obj.nurses.forEach(function (nurse) {
                    axios
                        .get('http://localhost:5000/userDetails/getUserName',
                            { params: { userID: nurse } }
                        )
                        .then(res => {
                            // console.log("PLEASEE2 ", res.data)
                            obj.nursesNames = obj.nursesNames + res.data + "; "

                        })
                        .catch(err => {
                            return err.response.status
                        })

                })
                obj.treatments = [];
                obj.treatmentHistory.forEach(function(treatment){
                    axios
                        .get('http://localhost:5000/treatmenthistory/getCurrentTreatmentForUser',
                            { params: { treatmentID: treatment } }
                        )
                        .then(res => {
                            if(res.data.current === true){
                                delete res.data.createdBy;
                                delete res.data.createdOn;
                                delete res.data.notes;
                                res.data.doctorName = "";
                                axios
                                    .get('http://localhost:5000/userDetails/getUserName',
                                        { params: { userID: res.data.doctorID } }
                                    )
                                    .then(res2 => {
                                        console.log("PLEASEE2 getUserName ", res2.data)
                                        res.data.doctorName = res2.data

                                    })
                                    .catch(err => {
                                        console.log("PLEASEE2 getUserName222 ", err)
                                        return err
                                    })
                                res.data.drugs.forEach(function(drug){
                                    console.log("FSDFSFSDFds, " , drug)
                                    let drugIDt = drug.medID;
                                    axios
                                        .get('http://localhost:5000/drugs/getDrugByID',
                                            { params: { drugID: drugIDt } })
                                        .then(res => {
                                            drug.name = res.data.Name;
                                            drug.administration = res.data.Administration;
                                            drug.concentration = res.data.Concentration;
                                   
                                        })
                                        .catch(err => {
                                            return err
                                        })
                                })
                                obj.treatments.push(res.data)
                            }
                        })
                        .catch(err => {
                            return err.response.status
                        })
                })
                return obj
            })
            console.log("USER FUNCTION ", test)
            return test
        })
        .catch(err => {
            return err.response.status
        })
}



export const getUserPhoto = user => {
    return axios
        .get('http://localhost:5000/patients/getUserPhoto',
            { params: { userID: user } }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response.status
        })
}

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
    console.log("US ", user + " acc" + typeof (accessLvl))
    return axios
        .get('http://localhost:5000/patients/getPatientsBy',
            { params: { userID: user, accessLvl: accessLvl } })
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

export const getPatientAddressByUserID = userID => {
    return axios
        .get('http://localhost:5000/patients/getPatientAddressByUserID',
            { params: { patientID: userID } }
        )
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err.response
        })
}

export const getPatientByUserID = userID => {
    return axios
        .get('http://localhost:5000/patients/getPatientByUserID',
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

export const modifyUserImage = (image, userID) => {
    return axios
        .put('http://localhost:5000/patients/modifyImage',
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

export const modifyGD = address => {
    return axios
        .put('http://localhost:5000/patients/modifyGD',
            {
                patientDetailsID: address.patientDetailsID,
                firstName: address.firstName,
                lastName: address.lastName,
                gender: address.gender,
                phone: address.phone
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}

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
            return res
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
            return res
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

export const getUserProfile = user => {
    return axios
        .get('http://localhost:5000/userDetails/getUserProfile',
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

export const getUserName = user => {
    return axios
        .get('http://localhost:5000/userDetails/getUserName',
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

export const getDrugByID = drugID => {
    return axios
        .get('http://localhost:5000/drugs/getDrugByID',
            { params: { drugID: drugID } })
        .then(res => {
            return res
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
//GET
export const getCurrentTreatmentForUser = treatmentID => {
    return axios
        .get('http://localhost:5000/treatmenthistory/getCurrentTreatmentForUser',
            { params: { treatmentID: treatmentID } }
        )
        .then(res => {
            return res
        })
        .catch(err => {
            return err.response.status
        })
}

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

export const changeCurrent = details => {
    return axios
        .put('http://localhost:5000/treatmenthistory/changeCurrent',
            {
                treatmentID: details,
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}

export const removeUserSettings = details => {
    return axios
        .put('http://localhost:5000/treatmenthistory/removeUserSettings',
            {
                admSettings: details.admSettings,
                treatmentID: details.treatmentID,
                drugID: details.drugID
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}

export const addUserSettings = details => {
    return axios
        .put('http://localhost:5000/treatmenthistory/addUserSettings',
            {
                admSettings: details.admSettings,
                treatmentID: details.treatmentID,
                drugID: details.drugID
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}

export const addNote = details => {
    return axios
        .put('http://localhost:5000/treatmenthistory/addNote',
            {
                note: details.note,
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


// VITAL SIGNS
// POST
export const addVitalSigns = details => {
    return axios
        .post('http://localhost:5000/vitalsigns/createVS', {
            userID: details.userID,
            temperatureC: details.temperatureC,
            bloodOxygenLevel: details.bloodOxygenLevel,
            heartRate: details.heartRate,
            respiratoryRate: details.respiratoryRate,
            date: details.date,
            systolic: details.systolic,
            diastolic: details.diastolic,
        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err.response
        })
}

// GET
export const getVSForUser = details => {
    return axios
        .get('http://localhost:5000/vitalsigns/getVSForUser',
            { params: { patientID: details } }
        )
        .then(res => {
            return res
        })
        .catch(err => {
            return err.response
        })
}

export const getTodayRegister = details => {
    return axios
        .get('http://localhost:5000/vitalsigns/getToday', {

        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err.response
        })
}

// PUT

export const addHealthStatus = details => {
    return axios
        .put('http://localhost:5000/vitalsigns/addHealthStatus',
            {
                vitalSignsID: details.vitalSignsID,
                status: details.status,
                symptoms: details.symptoms,
            }
        )
        .then(res => {
            return res.status
        })
        .catch(err => {
            return err.response.status
        })
}


// GHQ
// POST
export const addQuestionnaire = details => {
    return axios
        .get('http://localhost:5000/questionnaire/createGHQ', {
            patientID: details.patientID,
            answers: details.answers,
            scores: details.scores,
            creationDate: details.creationDate,

        })
        .then(res => {
            return res
        })
        .catch(err => {
            return err.response
        })
}

export const getGHQbyPatient = details => {
    return axios
        .get('http://localhost:5000/questionnaire/getGHQbyPatient', { params: { patientID: details } })
        .then(res => {
            return res
        })
        .catch(err => {
            return err.response
        })
}

