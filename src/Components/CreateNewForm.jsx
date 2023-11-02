import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';


const CreateNewForm = () => {

    const {user} = useContext(AuthContext)

    const navigate = useNavigate();

    const location = useLocation();
    // console.log(location.state);

    const [formObject, setFormObject] = useState({
        name: location.state.name,
        image: location.state.image,
        fields: []
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const addField = (data) => {

        // console.log(data);
        const fieldInfo = { name: data.name, placeholder: data.placeholder, type: data.type }

        const image = data.image[0]
        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Token}`, {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(imageResponse => {
                    console.log(imageResponse);
                    if (imageResponse.success) {
                        fieldInfo.image = imageResponse.data.display_url
                    }
                })
            // console.log(formData);

        }


        formObject.fields.push(fieldInfo);
        reset();
        document.getElementById('close').click();
    }

    const removeField = name => {
        const newFields = formObject.fields.filter(field => field.name !== name)
        const newForm = { name: formObject.name, fields: newFields }
        setFormObject(newForm)
    }

    const saveForm = () => {

        // console.log(formObject);

        formObject.creator = user.uid;
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to add this form",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('https://form-server-gamma.vercel.app/forms', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(formObject)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire(
                                'Added!',
                                'New Form added.',
                                'success'
                            )
                            navigate('/')

                        }
                    })
            }
        })


    }

    console.log('form object', formObject);
    return (
        <div>
            <div className='md:w-2/3 mx-auto'>
                <div className='flex justify-center items-center gap-8'>
                    <img className='w-24 rounded' src={formObject.image} />
                    <h1 className='text-3xl font-bold text-center'>{formObject.name}</h1>
                </div>

                <div className='md:w-2/3 mx-auto border mt-8 p-6 rounded-lg flex flex-col items-center'>
                    {
                        formObject.fields.map(field =>
                            <div key={field.name} className='flex flex-col items-center justify-around w-full my-8'>
                                {
                                    field.image && <img className='h-48' src={field.image}></img>
                                }
                                <div className='flex w-full'>
                                    <input
                                        className='m-2 p-2 rounded w-full'
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        name={field.name}
                                    />
                                    <button onClick={() => removeField(field.name)}>
                                        <FaTrashAlt className='text-red-700'></FaTrashAlt>
                                    </button>
                                </div>
                            </div>
                        )
                    }

                    <button className="btn" onClick={() => window.my_modal_2.showModal()}><FaPlus></FaPlus> Add Field</button>
                </div>

                <div className='md:w-1/2 mx-auto m-4 flex justify-end'>
                    {formObject.fields.length ? <button onClick={saveForm} className='btn btn-success'>Save</button> : ''}
                </div>

                {/* Open the modal using ID.showModal() method */}

                <dialog id="my_modal_2" className="modal">
                    <form onSubmit={handleSubmit(addField)} method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg">Enter field information.</h3><br />


                        <input className='m-2 p-2 rounded w-full' type="text" placeholder='Name' {...register('name', { required: true })} /> <br />
                        <p className='text-red-700 ms-4'>{errors.name ? "This field is required" : ''}</p>

                        <input className='m-2 p-2 rounded w-full' type="text" placeholder='Placeholder' {...register('placeholder', { required: true })} /> <br />
                        <p className='text-red-700 ms-4'>{errors.placeholder ? "This field is required" : ''}</p>


                        <select placeholder='Type of data' {...register('type', { required: true })} className='m-2 p-2 rounded w-full' >
                            <option value=""></option>
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="number">Number</option>
                        </select> <br />
                        <p className='text-red-700 ms-4'>{errors.type ? "This field is required" : ''}</p>

                        <input type="file" {...register('image')} className="file-input file-input-bordered w-full max-w-xs" />

                        <input className='btn btn-success m-2' type="submit" value="Add" />

                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button id='close'>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default CreateNewForm;