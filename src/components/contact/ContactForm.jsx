import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useUiStore from '../../store/uiStore';

const validationSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    email: yup.string().email('El correo no es válido').required('El correo es obligatorio'),
    message: yup.string().required('El mensaje es obligatorio').min(10, 'El mensaje debe tener al menos 10 caracteres'),
}).required();
 
const ContactForm = () => {
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
            const response = await fetch('https://formspree.io/f/mpwyynga', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                showNotification({
                    message: '¡Mensaje enviado con éxito!',
                    type: 'success'
                });
                reset();
            } else {
                throw new Error('Hubo un problema al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error de envío:', error);
            showNotification({
                message: 'Hubo un problema al enviar. Inténtalo de nuevo.',
                type: 'error'
            });
        }
    };

    return (
        <div className='w-full max-w-2xl mx-auto mt-12'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='space-y-6'>
                    <div>
                        <label htmlFor="name" className='block text-sm font-medium text-neutral-300'>
                            Nombre
                        </label>
                        <input type="text" id='name' {...register('name')} className={`mt-1 block w-full rounded-md border-neutral-700 bg-neutral-800 text-neutral-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm ${errors.name ? 'border-red-500' : 'border-neutral-700'}`} />
                        {errors.name && <p className='mt-2 text-sm text-red-400'>{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className='block text-sm font-medium text-neutral-300'>Email</label>
                        <input type="email" id="email" {...register('email')} className={`mt-1 block w-full rounded-md border-neutral-700 bg-neutral-800 text-neutral-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-neutral-700'}`} />
                        {errors.email && <p className='mt-2 text-sm text-red-400'>{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="message" className='block text-sm font-medium text-neutral-300'>Mensaje</label>
                        <textarea id="message" rows="4" {...register('message')} className={`mt-1 block w-full rounded-md border-neutral-700 bg-neutral-800 text-neutral-100 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm ${errors.message ? 'border-red-500' : 'border-neutral-700'}`}></textarea>
                        {errors.message && <p className='mt-2 text-sm text-red-400'>{errors.message.message}</p>}
                    </div>
                </div>

                <div className='mt-8 text-center'>
                    <button type='submit' disabled={isSubmitting} className='inline-block w-full sm:w-auto rounded-md bg-sky-500 px-12 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-sky-600 hover:scale-105 disabled:bg-neutral-600 disabled:cursor-not-allowed disabled:scale-100'>
                        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;