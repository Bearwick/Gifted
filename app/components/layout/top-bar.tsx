"use client";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { signOut } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";

const pages = ["Sign out"];

const Login = () => {
  return (
    <Link
      href="/api/auth/signin?callbackUrl=%2Fdashboard"
      className="rounded-md bg-white px-6 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
    >
      Sign in
    </Link>
  );
};

const Profile = () => {
  const { data: session } = useSession();
  const image = session?.user?.image ?? undefined;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={session?.user?.name || "User"} src={image} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {pages.map((pages) => (
          <MenuItem
            key={pages}
            onClick={() => {
              handleCloseUserMenu();
              if (pages === "Sign out") {
                void signOut({ callbackUrl: "/" });
              }
            }}
          >
            <Typography sx={{ textAlign: "center" }}>{pages}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const AppBarContent = () => {
  const { data: session, status } = useSession();
  const role = session?.user?.role;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {role === "admin" ? (
        <Link href="/admin" className="text-sm text-red-400 hover:underline">
          Admin dashboard
        </Link>
      ) : null}

      {status === "authenticated" ? <Profile /> : <Login />}
    </Box>
  );
};

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Link href={"/"} className="text-2xl">
              🎁 GIFTED
            </Link>
          </Box>

          <AppBarContent />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
