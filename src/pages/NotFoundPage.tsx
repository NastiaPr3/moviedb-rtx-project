import css from './notFoundPage.module.css'

const NotFoundPage = () => {
    return (
        <div>
            <div className={css.notFound}>
                404 Not Found
            </div>
            <hr className={css.hr}/>
        </div>

    );
};

export {NotFoundPage};