import React from 'react'
import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import TodayIcon from '@mui/icons-material/Today'
import UpcomingIcon from '@mui/icons-material/Upcoming'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import DeleteIcon from '@mui/icons-material/Delete'
import LogoutIcon from '@mui/icons-material/Logout'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Nav = ({ changeModule }) => {
    const [cookies,setCookie,removeCookie] = useCookies(null)
    const navigate = useNavigate()

    const handleLogout = () => {
        removeCookie('Email')
        removeCookie('Authtoken')
        navigate('/login')
    }

  return (
    <div className="nav-container">
        <List>
            <ListItem>
                <ListItemButton onClick={() => changeModule('today')}>
                    <ListItemIcon><TodayIcon/></ListItemIcon>
                    <ListItemText>Today</ListItemText>
                </ListItemButton>               
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => changeModule('upcoming')}>
                    <ListItemIcon><UpcomingIcon/></ListItemIcon>
                    <ListItemText>Upcoming</ListItemText>
                </ListItemButton>               
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => changeModule('calender')}>
                    <ListItemIcon><CalendarMonthIcon/></ListItemIcon>
                    <ListItemText>My Calender</ListItemText>
                </ListItemButton>               
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => changeModule('comTask')}>
                    <ListItemIcon><AssignmentTurnedInIcon/></ListItemIcon>
                    <ListItemText>Completed Task</ListItemText>
                </ListItemButton>               
            </ListItem>
            <ListItem>
                <ListItemButton onClick={() => changeModule('delTask')}>
                    <ListItemIcon><DeleteIcon/></ListItemIcon>
                    <ListItemText>Deleted Task</ListItemText>
                </ListItemButton>               
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon/></ListItemIcon>
                    <ListItemText>Log Out</ListItemText>
                </ListItemButton>               
            </ListItem>
        </List>
    </div>
  )
}

export default Nav