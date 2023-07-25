import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';


const FormList = () => {
    return (
        <div className='mt-20'>

            <Link to='/createForm' className='flex justify-center h-56 w-56 rounded-md text-2xl border'>
                <div className='flex flex-col justify-center items-center'>
                    <FaPlus></FaPlus>
                    <span>Create New Form</span>
                </div>
            </Link>
        </div>
    );
};

export default FormList;