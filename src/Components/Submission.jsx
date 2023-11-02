import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Submission = () => {

    const data = useLoaderData();
    // console.log(data[1].userName);

    const [modalData, setModalData] = useState(null)

    return (
        <div className='md:w-1/2  mx-auto'>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((res, index) =>
                                <tr key={res._id}>
                                    <td>{index + 1}</td>
                                    <td>{res.userName}</td>
                                    <td><button className="btn" onClick={() => {
                                        setModalData(res)
                                        document.getElementById('my_modal_1').showModal()
                                    }}>View</button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{modalData?.userName}</h3>

                    {
                        Object.entries(modalData).map(([key, value]) => {
                            if (key !== '_id' && key !== 'userName') {
                                return <p className='my-4' key={key}>{key + ": " + value}</p>
                
                            }
                        })
                    }
                    <div className="modal-action">
                        <form method="dialog">

                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default Submission;