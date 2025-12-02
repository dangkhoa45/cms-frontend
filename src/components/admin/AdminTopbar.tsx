"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge,
  Tooltip,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import {
  Logout,
  Settings as SettingsIcon,
  Notifications,
  Search,
  HelpOutline,
  AccountCircle,
} from "@mui/icons-material";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { backendApi } from "@/libs/api";
import Link from "next/link";
import type { User } from "@/types/api";

interface AdminTopbarProps {
  user: User | null;
}

/**
 * AdminTopbar - Client component
 *
 * RULES:
 * 1. Receives user as prop instead of calling useAuth
 * 2. Parent component (AdminLayoutContent) provides user data
 */
export function AdminTopbar({ user }: AdminTopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] =
    useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await backendApi.auth.logout();
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
    handleClose();
  };

  // Generate breadcrumbs from pathname
  const pathSegments = pathname?.split("/").filter(Boolean) || [];
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "white",
        color: "text.primary",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left: Breadcrumbs */}
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return isLast ? (
                <Typography key={crumb.href} color="primary" fontWeight={600}>
                  {crumb.label}
                </Typography>
              ) : (
                <MuiLink
                  key={crumb.href}
                  component={Link}
                  href={crumb.href}
                  underline="hover"
                  color="inherit"
                >
                  {crumb.label}
                </MuiLink>
              );
            })}
          </Breadcrumbs>
        </Box>

        {/* Right: Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Search */}
          <Tooltip title="Tìm kiếm">
            <IconButton size="medium">
              <Search />
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Thông báo">
            <IconButton
              size="medium"
              onClick={(e) => setNotificationAnchor(e.currentTarget)}
            >
              <Badge badgeContent={0} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Help */}
          <Tooltip title="Trợ giúp">
            <IconButton size="medium">
              <HelpOutline />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

          {/* User Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}
            >
              <Typography variant="body2" fontWeight={600}>
                {user?.email?.split("@")[0] || "Admin"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Administrator
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                {user?.email?.[0]?.toUpperCase() || "A"}
              </Avatar>
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              elevation: 3,
              sx: { mt: 1.5, minWidth: 200 },
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #e0e0e0" }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {user?.email}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Administrator
              </Typography>
            </Box>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Hồ sơ
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Cài đặt
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>

          {/* Notification Menu */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={() => setNotificationAnchor(null)}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              elevation: 3,
              sx: { mt: 1.5, minWidth: 320 },
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #e0e0e0" }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Thông báo
              </Typography>
            </Box>
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Không có thông báo mới
              </Typography>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
