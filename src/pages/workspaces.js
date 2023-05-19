import Home_layout from '../components/layout/home_layout';
import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import NProgress from 'nprogress';
import toast, { Toaster } from 'react-hot-toast';
import { LeftOutlined } from '@ant-design/icons';
import Router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { createWorkspace } from '../components/services/workspaces.service';

const Workspaces = () => {
    const dispatch = useDispatch();
    const config = useSelector((state) => state.app);
    // const[workspace, setWorkspace] = useState([]);
    const [user, setUser] = useState(config.user);

    const [loadingButton, setLoadingButton] = useState(false);
    const router = useRouter();

    const [workspaces, setWorkspaces] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleChange = (e) => setWorkspaces({ ...workspaces, [e.target.name]: e.target.value });

    useEffect(() => {
        fetch('/api/workspaces')
            .then((response) => {
                if (response.status === 200) {
                    setWorkspaces(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleCreateWorkspace = (e, button) => {
        e.preventDefault();
        setLoadingButton(true);
        try {
            const formData = new FormData(e.target);
            fetch('/api/workspaces', {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (response.status === 201) {
                        setModalOpen(false);
                        setWorkspaces([...workspaces, response.data]);
                    } else {
                        console.log('There was an error creating your workspace.');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (e) {
            console.log(e);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <h1>{title}</h1>
            {workspaces.length > 0 ? (
                <div>
                    <p>You already have an existing workspace.</p>
                    <button onClick={handleCloseModal}>Close</button>
                </div>
            ) : (
                <div>
                    {children}
                    <button onClick={() => setModalOpen(true)}>Create Workspace</button>
                </div>
            )}
            {modalOpen && <Modal title="Create Workspace" content={children} onClose={handleCloseModal} />}
        </div>
    );

    //   const handleCreateWorkspace = async (e, buttonId) => {
    //     // alert(e.toString());
    //     e.preventDefault();
    //       try {
    //           setLoadingButton(true);
    //           NProgress.start();
    //           const {auth_token: token, _id: user_id, public_key} = user;
    //           const {name} = workspace;
    //           const create = await createWorkspace({token, user_id, public_key, name});
    //           toast.success('Workspace created')
    //           Router.push('/dashboard');
    //       } catch (err) {
    //           setLoadingButton(false)
    //           NProgress.done();
    //           console.log('An error occurred', err);
    //           const error = err.response? err.response.data.errors: err.toString();
    //           toast.error(error || err.toString())
    //       }
    //   }
    //   useEffect(() => {

    //   }, [])

    // return (
    //   <Home_layout title="Create Workspace">
    //     <div className="h-100 row overflow-hidden g-0">
    //       <div className="col-lg-12 padding_50 bg-white d-flex align-items-center justify-content-center">
    //         <div className="col-lg-7 mx-auto">
    //           <h4 onClick={()=> router.back()} className="text-primary"><LeftOutlined /> Back</h4>
    //             <div>
    //               <h1 className="mb-2 font-weight-700">
    //                   Create a Workspace
    //               </h1>
    //               <p className="mb-5 lead">Each workspace is unique, with its own apps, integrations, teams, and activities.</p>
    //                 <section>
    //                 <form id="create_form" onSubmit={(e) => {handleCreateWorkspace(e, 'create_button')}}>
    //                     <div className="row">

    //                       <div className="col-12 mb-4">
    //                         <div className="form-floating">
    //                           <input
    //                             type="text"
    //                             required
    //                             onChange={handleChange}
    //                             value={workspace.name}
    //                             className="form-control"
    //                             placeholder="Workspace Name"
    //                             name="name"
    //                           />
    //                           <label>Workspace Name</label>
    //                         </div>
    //                       </div>

    //                       <div className="col-lg-12 mt-3 mx-auto">
    //                         <button
    //                           className="btn btn-lg p-3 mt-4 btn-primary w-100"
    //                           disabled={loadingButton}
    //                           id="create_button"
    //                         >
    //                           Create Workspace
    //                         </button>
    //                       </div>
    //                     </div>
    //                   </form>
    //                 </section>
    //             </div>
    //         </div>
    //       </div>
    //     </div>

    //     <Toaster position="top-center" reverseOrder={false} />
    //   </Home_layout>
    // );
};

export default Workspaces;
