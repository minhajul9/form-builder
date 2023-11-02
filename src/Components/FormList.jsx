import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';
import axios from 'axios';



const FormList = () => {
    const navigate = useNavigate();

    const [forms, setForms] = useState([]);

    useEffect(() => {
        fetch('https://form-server-gamma.vercel.app/forms')
            .then(res => res.json())
            .then(data => setForms(data))
    }, [])

    
    const handleImageUpload = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Upload Image',
            html:
                '<input id="name" class="swal2-input" placeholder="Enter Name">' +
                '<input type="file" id="image" class="swal2-input" accept="image/*">',
            focusConfirm: false,
            preConfirm: async () => {
                const name = document.getElementById('name').value;
                const image = document.getElementById('image').files[0];

                if (!name) {
                    Swal.showValidationMessage('Please enter name of the form.');
                    return false;
                }

                if (image) {
                    try {
                        const formData = new FormData();
                        formData.append('image', image);

                        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Token}`, formData);

                        if (response.data && response.data.data) {
                            return { name, imageUrl: response.data.data.url };
                        } else {
                            throw new Error('Failed to upload image.');
                        }
                    } catch (error) {
                        Swal.showValidationMessage(`Upload failed: ${error}`);
                    }
                }
            }
        });

        if (formValues) {

            const { name, imageUrl } = formValues;
            navigate('/createForm', { state: { name, image: imageUrl } })

        }
    };


    return (
        <div className='mt-20 grid grid-cols-2 md:grid-cols-4 gap-4'>

            {
                forms.map(form =>
                    <button className='my-8' onClick={() => {
                        navigate('/formPreview', { state: { form } })
                    }} key={form._id} >
                        <div className='flex flex-col justify-center items-center h-56 w-56 rounded-md gap-6 text-2xl border bg-slate-700 text-white'>
                            <span>{form.name}</span>
                        </div>
                    </button>
                )
            }





            <button onClick={handleImageUpload}>
                <div className='flex flex-col justify-center items-center h-56 w-56 rounded-md gap-6 text-2xl border'>
                    <FaPlus></FaPlus>
                    <span>Create New Form</span>
                </div>
            </button>
        </div>
    );
};

export default FormList;