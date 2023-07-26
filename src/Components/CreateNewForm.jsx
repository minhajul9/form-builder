import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';


const CreateNewForm = () => {

    const location = useLocation();
    // console.log(location.state.name);

    const formObject = {
        name: location.state.name,
        fields: []
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const addField = (data) => {
        console.log(data);
    }

    return (
        <div>
            <div className='md:w-2/3 mx-auto'>
                <h1 className='text-3xl font-bold text-center'>{formObject.name}</h1>
        
                {/* Open the modal using ID.showModal() method */}
                <button className="btn" onClick={() => window.my_modal_2.showModal()}><FaPlus></FaPlus> Add Field</button>
                <dialog id="my_modal_2" className="modal">
                    <form onSubmit={handleSubmit(addField)} method="dialog" className="modal-box">
                        <h3 className="font-bold text-lg">Enter field information.</h3><br />

                        <input className='m-2 p-2 rounded w-full' type="text" placeholder='Name' {...register('name', {required: true})} /> <br />

                        <input className='m-2 p-2 rounded w-full' type="text" placeholder='Placeholder' {...register('placeholder', {required: true})} /> <br />

                        <input className='m-2 p-2 rounded w-full' type="type" placeholder='Type of data' {...register('type', {required: true})} /> <br />

                        <input className='btn btn-success m-2' type="submit" value="Add" />
                        
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default CreateNewForm;