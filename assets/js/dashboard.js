/**
 * Admin Dashboard - Javascript
 * Author: Elena Rostova
 */

document.addEventListener('DOMContentLoaded', function () {
    // ----------------------------------------------------
    // Sidebar Section Switching
    // ----------------------------------------------------
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const dashboardSections = document.querySelectorAll('.dashboard-section');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSectionId = this.getAttribute('data-section');
            
            // Remove active from links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all sections, show target
            dashboardSections.forEach(sec => {
                sec.style.display = 'none';
            });
            
            const targetSec = document.getElementById(targetSectionId);
            if (targetSec) {
                targetSec.style.display = 'block';
            }
            
            // If on mobile, close sidebar on link click
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('show-sidebar')) {
                sidebar.classList.remove('show-sidebar');
            }
        });
    });

    // ----------------------------------------------------
    // Mobile Sidebar Toggle
    // ----------------------------------------------------
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('show-sidebar');
        });
    }

    // Close sidebar when clicking outside of it on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth < 992 && sidebar && sidebarToggleBtn) {
            if (!sidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
                sidebar.classList.remove('show-sidebar');
            }
        }
    });

    // ----------------------------------------------------
    // Render Dashboard Charts (SVG/Canvas based)
    // ----------------------------------------------------
    renderAnalyticsCharts();

    // Re-render charts on resize to keep responsive
    window.addEventListener('resize', function () {
        renderAnalyticsCharts();
    });

    function renderAnalyticsCharts() {
        const bookingsChartContainer = document.getElementById('bookings-chart');
        if (!bookingsChartContainer) return;
        
        bookingsChartContainer.innerHTML = '';
        const width = bookingsChartContainer.clientWidth || 500;
        const height = 250;
        
        // Data for bookings per month
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
        const values = [45, 55, 68, 85, 120, 150, 140, 165]; // values representing guest check-ins
        
        const maxValue = Math.max(...values) * 1.1;
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        // Build SVG string
        let svgHtml = `<svg width="${width}" height="${height}" style="overflow: visible;">`;
        
        // Grid lines and labels (Y Axis)
        const gridLinesCount = 5;
        for (let i = 0; i <= gridLinesCount; i++) {
            const y = padding + (chartHeight / gridLinesCount) * i;
            const val = Math.round(maxValue - (maxValue / gridLinesCount) * i);
            svgHtml += `
                <line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="var(--card-border)" stroke-dasharray="4" stroke-width="1" />
                <text x="${padding - 10}" y="${y + 4}" font-size="12" fill="var(--text-muted)" text-anchor="end">${val}</text>
            `;
        }
        
        // X Axis labels and points
        let pointsString = '';
        const pointsCount = values.length;
        
        values.forEach((val, idx) => {
            const x = padding + (chartWidth / (pointsCount - 1)) * idx;
            const y = padding + chartHeight - (val / maxValue) * chartHeight;
            
            pointsString += `${x},${y} `;
            
            // Vertical marker hover lines helper
            svgHtml += `
                <line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="rgba(42, 75, 124, 0.05)" stroke-width="2" />
                <circle cx="${x}" cy="${y}" r="5" fill="var(--secondary-color)" stroke="var(--primary-color)" stroke-width="2" />
                <text x="${x}" y="${height - padding + 20}" font-size="12" fill="var(--text-muted)" text-anchor="middle">${labels[idx]}</text>
                <text x="${x}" y="${y - 12}" font-size="11" font-weight="500" fill="var(--primary-color)" text-anchor="middle">${val}</text>
            `;
        });
        
        // Draw path line
        svgHtml += `
            <polyline points="${pointsString}" fill="none" stroke="var(--primary-color)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        `;
        
        svgHtml += `</svg>`;
        bookingsChartContainer.innerHTML = svgHtml;
    }
});
