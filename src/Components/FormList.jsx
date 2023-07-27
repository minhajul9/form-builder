import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2'



const FormList = () => {
    const navigate = useNavigate();

    const createForm = () => {
        Swal.fire({
            title: 'Enter Form Name',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Create',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                
                if (login) {
                    navigate('/createForm', { state: { name: login} })
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
    }

    return (
        <div className='mt-20'>

            <button onClick={createForm}>
                <div className='flex flex-col justify-center items-center h-56 w-56 rounded-md gap-6 text-2xl border'>
                    <FaPlus></FaPlus>
                    <span>Create New Form</span>
                </div>
            </button>
        </div>
    );
};

export default FormList;