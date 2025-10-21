import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUiStore } from '../../store/uiStore';
import { FaPen, FaEnvelope, FaUser } from 'react-icons/fa'

const validationSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    email: yup.string().email('El correo no es válido').required('El correo es obligatorio'),
    message: yup.string().required('El mensaje es obligatorio').min(10, 'El mensaje debe tener al menos 10 caracteres'),
}).required();
 
const ContactForm = () => {
    const [accessKey] = useState('9ded55d0-8aba-4f4a-a8bb-3ba9163dfc6c')
    const showNotification = useUiStore((state) => state.showNotification);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        try {
            const formData = {...data, access_key: accessKey,}

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json()

            if (result.success) {
                showNotification({
                    message: '¡Mensaje enviado con éxito!',
                    type: 'success'
                });
                reset();
            } else {
                console.error('Error desde Web3Forms:', result)
                throw new Error(result.message || 'Hubo un problema al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error de envío:', error);
            showNotification({
                message: 'Hubo un problema al enviar. Inténtalo de nuevo.',
                type: 'error'
            });
        }
    };

    const SpinnerIcon = () => {
        <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='https://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'> 
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle> 
        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path> 
        </svg>
    }

    return (

        <div className='w-full max-w 2xl mx-auto mt-12 p-8 bg-neutral-900 border border-l-neutral-800 rounded-xl shadow-2xl shadow-sky-500/10'>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-8'>

                <div className='relative'>

                    <input type="text" id='name' {...register('name')} className={`peer block w-full appearance-none rounded-md border bg-transparent px-12 py-3 text-base text-neutral-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${errors.name ? 'border-red-500' : 'border-neutral-700'}`} placeholder='' />

                    <label htmlFor="name" className='absolute top-3 left-12 origin-[0] -translate-y-7 scale-75 transform text-sm text-neutral-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-sky-400'>Nombre</label>

                    <FaUser className='absolute top-3.5 left-4 text-neutral-500' />

                    {errors.name && <p className='mt-2 text-sm text-red-400'> {errors.name.message} </p>}

                </div>


                <div className='relative'>
                    
                    <input type="text" id='email' {...register('email')} className={`peer block w-full appearance-none rounded-md border bg-transparent px-12 py-3 text-base text-neutral-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${errors.email ? 'border-red-500' : 'border-neutral-700'}`} placeholder='' />

                    <label htmlFor="email" className='absolute top-3 left-12 origin-[0] -translate-y-7 scale-75 transform text-sm text-neutral-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-sky-400'>Email</label>

                    <FaEnvelope className='absolute top-3.5 left-4 text-neutral-500' />

                    {errors.email && <p className='mt-2 text-sm text-red-400'> {errors.email.message} </p>}

                </div>


                <div className='relative'>

                    <textarea id="message" rows='4' {...register('message')} className={`peer block w-full appearance-none rounded-md border bg-transparent px-12 py-3 text-base text-neutral-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${errors.email ? 'border-red-500' : 'border-neutral-700'}`} placeholder=''></textarea>

                    <label htmlFor="message" className='absolute top-3 left-12 origin-[0] -translate-y-7 scale-75 transform text-sm text-neutral-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-sky-400'>Mensaje</label>

                    <FaPen className='absolute top-4 left-4 text-neutral-500' />

                    {errors.message && <p className='mt-2 text-sm text-red-400'>{errors.message.message}</p>}

                </div>

                <div className='mt-8 text-center'>

                    <button type='submit' disabled={isSubmitting} className='inline-flex items-center justify-center w-full sm:w-auto rounded-md bg-sky-500 px-12 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-sky-600 hover:scale-105 disabled:bg-neutral-600 disabled:cursor-not-allowed disabled:scale-100'>

                        {isSubmitting && <SpinnerIcon />}
                        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}

                    </button>

                </div>

            </form>

        </div>

    )
}

export default ContactForm;

// 