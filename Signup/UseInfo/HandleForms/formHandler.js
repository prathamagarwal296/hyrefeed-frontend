const profileBigFromHandler = (event, setProfile, profile) => {
    if (event.target.name === "resume") {
        setProfile({
            ...profile,
            [event.target.name]: event.target.files[0],
            fileName: event.target.files[0].name,
        })
    }
    else {
        setProfile({
            ...profile,
            [event.target.name]: event.target.value,
        })
    }
}

const handleEducation = (event, ed, setEd, index) => {
    let inputType = ["institute", "from", "to", "courseType", "degree"];
    if (inputType.includes(event.target.name)) {
        let newEducation = [...ed.education];
        let newEdObj = {
            ...ed.education[index],
            [event.target.name]: event.target.value,
        };
        newEducation[index] = newEdObj;
        setEd({
            ...ed,
            education: newEducation,
        });
    }
    else {
        let newCertificate = [...ed.certificate];
        let newCertObj = {
            ...ed.certificate[index],
            [event.target.name]: event.target.value,
        };
        newCertificate[index] = newCertObj;
        setEd({
            ...ed,
            certificate: newCertificate,
        })
    }
}

const handleProForm = (event, pro, setPro, index) => {
    let newPosition = [...pro.position];
    let newProObj = {
        ...pro.position[index],
        [event.target.name]: event.target.value,
    };
    newPosition[index] = newProObj;
    setPro({
        ...pro,
        position: newPosition,
    });
}
export { profileBigFromHandler, handleEducation, handleProForm };