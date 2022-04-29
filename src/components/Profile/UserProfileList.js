import ProfileList from './ProfileList';
import classes from './UserProfileList.module.css';

const UserProfileList = () => {
    return (
        <section className={classes.profile}>
            <h1></h1>
            <ProfileList />
        </section>
    );
};

export default UserProfileList;