import { useFormData } from "../context/FormDataContext";

export const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { formData, setFormData } = useFormData();

    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};