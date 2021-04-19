const { useState } = React;
const { useHistory } = ReactRouterDOM;
const { TextField, Button  } = MaterialUI;

const Login = ({verifyUser}) => {
    let history = useHistory();
    const [userData, setUserData] = useState({
        user_name: '',
        password: ''
    });

    const { user_name, password } = userData;

    const onChange = e => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    };

    const loginUser = async () => {
        const newUser = {
            user_name: user_name,
            password: password
        }
        fetch('http://localhost:5000/api/login', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('user_id', data['user_id']);
            sessionStorage.setItem('user_name', data['user_name']);
            verifyUser();
            history.push('/');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    };

    return (
        <form>
            <TextField 
                required 
                name="user_name"
                label="Username" 
                placeholder="username"
                value={user_name} 
                onChange={e => onChange(e)}
                />
            <TextField
                required
                name="password"
                label="Password"
                type="password"
                placeholder="password"
                value={password}
                onChange={e => onChange(e)}
            />
            <Button 
                variant="contained" 
                color="primary"
                onClick={loginUser}>
                    Login
            </Button>
        </form>
    )
}