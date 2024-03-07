import CurrentForm from "../enums/currentForm.enum";

interface FormProp {
    onChangeForm: (selected: CurrentForm) => void;
}

export default FormProp;