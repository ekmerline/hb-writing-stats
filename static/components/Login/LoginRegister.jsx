const { useState } = React;

const { TextField, Button, Box  } = MaterialUI;

const LoginRegister = ({verifyUser}) => {

    const [checkedRegister, setCheckedRegister] = useState(false);

    const [userData, setUserData] = useState({
        user_name: '',
        password: '',
        email: ''
    });

    const { user_name, password, email } = userData;

    const onChange = e => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    };

    const handleCheckedChange = event => {
        setCheckedRegister(event.target.checked);
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
            sessionStorage.setItem('user_id', data['data']['user_id']);
            sessionStorage.setItem('user_name', data['data']['user_name']);
            verifyUser();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    };

    const registerUser = async () => {
        const newUser = {
            user_name: user_name,
            password: password,
            email: email
        }
        fetch('http://localhost:5000/api/register', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('user_id', data['data']['user_id']);
            sessionStorage.setItem('user_name', data['data']['user_name']);
            verifyUser();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
    };

    return (
        <Box>
            <Box>
            <TextField 
                required 
                name="user_name"
                label="Username" 
                placeholder="username"
                value={user_name} 
                onChange={e => onChange(e)}
                />
            </Box>
        <Box>
        <TextField
                required
                name="password"
                label="Password"
                type="password"
                placeholder="password"
                value={password}
                onChange={e => onChange(e)}
            />
        </Box>

        <Box>
            
        <Checkbox
            checked={checkedRegister}
            onChange={e => handleCheckedChange(e)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <label>New User?</label>
        </Box>
        {checkedRegister &&
        <React.Fragment>
        <Box>
        <TextField
                required
                name="email"
                label="Email"
                type="text"
                placeholder="email"
                value={email}
                onChange={e => onChange(e)}
            />
        </Box>
        <Box>
        <Button 
                variant="contained" 
                color="primary"
                onClick={registerUser}>
                    Register
            </Button>
        </Box>
        </React.Fragment>
        }
        {!checkedRegister &&
            <Box>

<Button 
        variant="contained" 
        color="primary"
        onClick={loginUser}>
            Login
    </Button>
</Box>
        }
        </Box>
    )
}