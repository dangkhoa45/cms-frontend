"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Collapse,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Dashboard,
  Inventory,
  Language,
  Article,
  Settings,
  ContactMail,
  Search,
  ViewHeadline,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { User } from "@/types/api";

const drawerWidth = 260;

const menuGroups = [
  {
    title: "Tổng quan",
    items: [{ label: "Dashboard", icon: Dashboard, href: "/admin/dashboard" }],
  },
  {
    title: "Nội dung",
    items: [
      { label: "Sản phẩm", icon: Inventory, href: "/admin/products" },
      { label: "Bài viết", icon: Article, href: "/admin/posts" },
      { label: "Dịch vụ", icon: Settings, href: "/admin/services" },
    ],
  },
  {
    title: "Quản lý Site",
    items: [
      { label: "Sites", icon: Language, href: "/admin/sites" },
      { label: "Headers", icon: ViewHeadline, href: "/admin/headers" },
      { label: "SEO", icon: Search, href: "/admin/seo" },
    ],
  },
  {
    title: "Khác",
    items: [{ label: "Liên hệ", icon: ContactMail, href: "/admin/contact" }],
  },
];

interface AdminSidebarProps {
  user: User | null;
}

/**
 * AdminSidebar - Client component
 *
 * RULES:
 * 1. Receives user as prop instead of calling useAuth
 * 2. Parent component (AdminLayoutContent) provides user data
 */
export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "Tổng quan",
    "Nội dung",
    "Quản lý Site",
    "Khác",
  ]);

  const toggleGroup = (title: string) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          {user?.email?.[0]?.toUpperCase() || "A"}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {user?.email?.split("@")[0] || "Admin"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Administrator
          </Typography>
        </Box>
      </Box>

      {/* Menu */}
      <Box sx={{ overflow: "auto", flexGrow: 1 }}>
        <List sx={{ px: 2, py: 2 }}>
          {menuGroups.map((group) => (
            <Box key={group.title}>
              <ListItem
                disablePadding
                sx={{
                  mt: group.title !== "Tổng quan" ? 2 : 0,
                  mb: 0.5,
                }}
              >
                <ListItemButton
                  onClick={() => toggleGroup(group.title)}
                  sx={{
                    borderRadius: 1,
                    py: 0.5,
                  }}
                >
                  <ListItemText
                    primary={group.title}
                    primaryTypographyProps={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "text.secondary",
                    }}
                  />
                  {expandedGroups.includes(group.title) ? (
                    <ExpandLess fontSize="small" />
                  ) : (
                    <ExpandMore fontSize="small" />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse
                in={expandedGroups.includes(group.title)}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      pathname?.startsWith(`${item.href}/`);
                    return (
                      <ListItem key={item.href} disablePadding>
                        <ListItemButton
                          component={Link}
                          href={item.href}
                          selected={isActive}
                          sx={{
                            borderRadius: 1,
                            my: 0.25,
                            py: 1,
                            pl: 2,
                            "&.Mui-selected": {
                              backgroundColor: "primary.main",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "primary.dark",
                              },
                              "& .MuiListItemIcon-root": {
                                color: "white",
                              },
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Icon fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: "0.875rem",
                              fontWeight: isActive ? 600 : 400,
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary" display="block">
          Version 1.0.0
        </Typography>
        <Typography variant="caption" color="text.secondary">
          © 2025 CMS Multi-Site
        </Typography>
      </Box>
    </Drawer>
  );
}
