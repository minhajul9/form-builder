import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const FormPreview = () => {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    const form = location.state.form
    console.log(form);
    const {
        register,
        handleSubmit,
        // reset
    } = useForm();

    const submitInfo = (data) => {
        
        const info= {data, formName: form.name};
        console.log(info);
        fetch('http://localhost:5000/submitInfo', {
            method: "POST",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(response => {
            if(response.insertedId){
                Swal.fire({
                    text: 'Submitted Successfully',
                    icon: 'success'}
                  )
            }
        })
    }

    return (
        <div className='md:w-1/2 mx-auto my-8'>
            <div className='flex justify-center items-center'>
                <img className='w-24' src={form.image} alt="" />
                <h1 className='text-2xl font-bold'>{form.name}</h1>
            </div>

            <div>
                <form onSubmit={handleSubmit(submitInfo)}>
                    {
                        form.fields.map(field =>
                            <div key={field.name} className='flex flex-col items-center justify-around w-full my-8'>
                                {
                                    field.image && <img className='h-48' src={field.image}></img>
                                }
                                <div className='flex w-full'>
                                    <input
                                        className='m-2 p-2 rounded w-full'
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        {...register(field.name.split(" ").join(''))}
                                    />
                                </div>
                            </div>
                        )
                    }

                    <input className='btn btn-success' type="submit" value="Submit" />
                </form>
            </div>
            {
                user.uid === form.creator && <button onClick={() => navigate('/')}>See Submissions</button>
            }
        </div>
    );
};

export default FormPreview;