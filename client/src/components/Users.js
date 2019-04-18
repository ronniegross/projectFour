import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SingleUser from './SingleUser'

class Users extends Component {
    state = {
        error: '',
        users: []
    }

    componentDidMount(){
        this.fetchUsers();
    }

    fetchUsers = async () => {
        try {
            const res = await axios.get('/api/users/');
            this.setState({users: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    deleteUser = async (event) => {
        try {
            event.preventDefault()
            this.state.users.map(user => (
                // axios.delete(`/api/users/${user.id}/`)
                console.log(user.id, user.name)
                // console.log(user.key)
            ))
        }
        catch (error) {
            console.log(error)
            this.setState({ error: error.message })
        }
    }

    render() {
        // console.log(this.state.users.id)
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <h1>All Users</h1>
                {this.state.users.map(user => (
                   
                    <div key={user.id}>
                        {/* <Link to={`/users/${user.id}`} >{user.name}: {user.id}</Link> */}
                        <Link to={`/user/${user.id}`} >{user.name}: {user.id}</Link>
                        {/* <h2>{user.name}</h2> */}
                        {/* <button onClick={this.deleteUser}>delete user</button> */}
                    </div>
                ))}
            </div>
        );
    }
}

export default Users;