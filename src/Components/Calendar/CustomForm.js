import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    AppointmentTooltip,
    AppointmentForm,
    Resources,
    Appointments,

} from '@devexpress/dx-react-scheduler-material-ui';

const BasicLayout = ({ onFieldChange, getUserAddress, appointmentData, ...restProps }) => {
    const onCustomFieldChange1 = (nextValue) => {
        if (nextValue === true) {
            onFieldChange({ patientVisit: nextValue });
            onFieldChange({ clinicVisit: false });
        }
    };

    const onCustomFieldChange2 = (nextValue) => {
        getUserAddress(appointmentData.patientID, appointmentData._id)
        if (nextValue === true) {

            onFieldChange({ clinicVisit: nextValue });
            onFieldChange({ patientVisit: false });
        }
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Custom Field"
                type="title"
            />
            <AppointmentForm.BooleanEditor
                label="Patient Visit"
                value={appointmentData.patientVisit}
                onValueChange={onCustomFieldChange1}
            />
            <AppointmentForm.BooleanEditor
                label="Clinic Visit"
                value={appointmentData.clinicVisit}
                onValueChange={onCustomFieldChange2}

            />
            <AppointmentForm.Label
                text="Address"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.address}
                onValueChange={onCustomFieldChange1}
                placeholder="Address"
                readOnly={true}
            />
        </AppointmentForm.BasicLayout>
    );

};

export default BasicLayout