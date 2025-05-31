// Review templates for PTE Intensive
// These templates can be personalized with:
// - {{teacherName}} - The name of the teacher
// - {{courseName}} - The name of the course
// - {{target}} - The target score or goal

export const reviewTemplates = [
  // Templates with all placeholders
  `Mình học khóa {{courseName}} tại PTE Intensive với {{teacherName}}. Giảng viên dạy rất dễ hiểu, tận tâm và luôn hỗ trợ học viên hết mình. Mình cảm thấy tiến bộ rõ rệt và đã đạt target {{target}}.`,
  
  `Trước đây mình chỉ đặt mục tiêu {{target}}, nhưng nhờ học với {{teacherName}} tại PTE Intensive, mình đã đạt được điểm mong muốn. Khóa {{courseName}} học rất sát thực tế.`,
  
  `{{teacherName}} là một giảng viên tuyệt vời tại PTE Intensive. Mình đã học khóa {{courseName}} và đạt được {{target}} như mong muốn. Phương pháp giảng dạy rất hiệu quả và dễ hiểu.`,
  
  `Mình rất hài lòng với khóa học {{courseName}} tại PTE Intensive. {{teacherName}} đã giúp mình tiến bộ rất nhiều và đạt được {{target}}. Giảng viên rất nhiệt tình và luôn sẵn sàng giải đáp mọi thắc mắc.`,
  
  `Khóa {{courseName}} tại PTE Intensive thực sự đáng giá. {{teacherName}} đã giúp mình đạt được {{target}} một cách dễ dàng. Phương pháp giảng dạy rất hiệu quả và dễ áp dụng.`,
  
  `Mình đã thử nhiều trung tâm nhưng chỉ có PTE Intensive với giảng viên {{teacherName}} mới giúp mình đạt được {{target}}. Khóa {{courseName}} được thiết kế rất khoa học và hiệu quả.`,
  
  `Cảm ơn {{teacherName}} và PTE Intensive đã giúp mình đạt được {{target}}. Khóa {{courseName}} đã cung cấp cho mình những kiến thức và kỹ năng cần thiết để thành công.`,
  
  `Mình đã học khóa {{courseName}} tại PTE Intensive và rất hài lòng với kết quả đạt được. {{teacherName}} đã giúp mình vượt qua mục tiêu {{target}} ban đầu.`,
  
  `{{teacherName}} tại PTE Intensive có phương pháp giảng dạy rất hiệu quả. Mình đã học khóa {{courseName}} và đạt được {{target}} chỉ sau một thời gian ngắn.`,
  
  `Mình rất may mắn khi được học khóa {{courseName}} với {{teacherName}} tại PTE Intensive. Giảng viên đã giúp mình đạt được {{target}} một cách dễ dàng.`,
  
  // Templates without target
  `Mình học khóa {{courseName}} tại PTE Intensive với {{teacherName}}. Giảng viên dạy rất dễ hiểu, tận tâm và luôn hỗ trợ học viên hết mình. Mình cảm thấy tiến bộ rõ rệt sau mỗi buổi học.`,
  
  `{{teacherName}} là một giảng viên tuyệt vời tại PTE Intensive. Mình đã học khóa {{courseName}} và cảm thấy rất hài lòng với kết quả đạt được. Phương pháp giảng dạy rất hiệu quả và dễ hiểu.`,
  
  `Mình rất hài lòng với khóa học {{courseName}} tại PTE Intensive. {{teacherName}} đã giúp mình tiến bộ rất nhiều. Giảng viên rất nhiệt tình và luôn sẵn sàng giải đáp mọi thắc mắc.`,
  
  `Khóa {{courseName}} tại PTE Intensive thực sự đáng giá. {{teacherName}} có phương pháp giảng dạy rất hiệu quả và dễ áp dụng.`,
  
  `Mình đã thử nhiều trung tâm nhưng chỉ có PTE Intensive với giảng viên {{teacherName}} mới giúp mình tiến bộ nhanh chóng. Khóa {{courseName}} được thiết kế rất khoa học và hiệu quả.`,
  
  // Templates without course name
  `Mình học tại PTE Intensive với {{teacherName}}. Giảng viên dạy rất dễ hiểu, tận tâm và luôn hỗ trợ học viên hết mình. Mình cảm thấy tiến bộ rõ rệt và đã đạt target {{target}}.`,
  
  `Trước đây mình chỉ đặt mục tiêu {{target}}, nhưng nhờ học với {{teacherName}} tại PTE Intensive, mình đã đạt được điểm mong muốn. Phương pháp giảng dạy rất sát thực tế.`,
  
  `{{teacherName}} là một giảng viên tuyệt vời tại PTE Intensive. Mình đã đạt được {{target}} như mong muốn. Phương pháp giảng dạy rất hiệu quả và dễ hiểu.`,
  
  `Mình rất hài lòng khi học tại PTE Intensive. {{teacherName}} đã giúp mình tiến bộ rất nhiều và đạt được {{target}}. Giảng viên rất nhiệt tình và luôn sẵn sàng giải đáp mọi thắc mắc.`,
  
  `PTE Intensive thực sự đáng giá. {{teacherName}} đã giúp mình đạt được {{target}} một cách dễ dàng. Phương pháp giảng dạy rất hiệu quả và dễ áp dụng.`,
  
  // Templates without teacher name
  `Mình học khóa {{courseName}} tại PTE Intensive. Giảng viên dạy rất dễ hiểu, tận tâm và luôn hỗ trợ học viên hết mình. Mình cảm thấy tiến bộ rõ rệt và đã đạt target {{target}}.`,
  
  `Trước đây mình chỉ đặt mục tiêu {{target}}, nhưng nhờ học tại PTE Intensive, mình đã đạt được điểm mong muốn. Khóa {{courseName}} học rất sát thực tế.`,
  
  `Mình đã học khóa {{courseName}} tại PTE Intensive và đạt được {{target}} như mong muốn. Phương pháp giảng dạy rất hiệu quả và dễ hiểu.`,
  
  `Mình rất hài lòng với khóa học {{courseName}} tại PTE Intensive. Giảng viên đã giúp mình tiến bộ rất nhiều và đạt được {{target}}. Họ rất nhiệt tình và luôn sẵn sàng giải đáp mọi thắc mắc.`,
  
  `Khóa {{courseName}} tại PTE Intensive thực sự đáng giá. Giảng viên đã giúp mình đạt được {{target}} một cách dễ dàng. Phương pháp giảng dạy rất hiệu quả và dễ áp dụng.`,
  
  // Templates with only teacher name
  `Mình học tại PTE Intensive với {{teacherName}}. Giảng viên dạy rất dễ hiểu, tận tâm và luôn hỗ trợ học viên hết mình. Mình cảm thấy tiến bộ rõ rệt sau mỗi buổi học.`,
  
  `{{teacherName}} là một giảng viên tuyệt vời tại PTE Intensive. Phương pháp giảng dạy rất hiệu quả và dễ hiểu.`,
  
  `Mình rất hài lòng khi học tại PTE Intensive với {{teacherName}}. Giảng viên rất nhiệt tình và luôn sẵn sàng giải đáp mọi thắc mắc.`,
  
  `PTE Intensive thực sự đáng giá. {{teacherName}} có phương pháp giảng dạy rất hiệu quả và dễ áp dụng.`,
  
  `Mình đã thử nhiều trung tâm nhưng chỉ có PTE Intensive với giảng viên {{teacherName}} mới giúp mình tiến bộ nhanh chóng.`,
  
  // Templates with only course name
  `Mình học khóa {{courseName}} tại PTE Intensive. Giảng viên dạy rất dễ hiểu, tận tâm và luôn hỗ trợ học viên hết mình. Mình cảm thấy tiến bộ rõ rệt sau mỗi buổi học.`,
  
  `Khóa {{courseName}} tại PTE Intensive thực sự đáng giá. Phương pháp giảng dạy rất hiệu quả và dễ áp dụng.`,
  
  `Mình rất hài lòng với khóa học {{courseName}} tại PTE Intensive. Giảng viên rất nhiệt tình và luôn sẵn sàng giải đáp mọi thắc mắc.`,
  
  `Mình đã học khóa {{courseName}} tại PTE Intensive và cảm thấy rất hài lòng với kết quả đạt được.`,
  
  `Khóa {{courseName}} tại PTE Intensive được thiết kế rất khoa học và hiệu quả. Mình đã tiến bộ rất nhiều sau khi hoàn thành khóa học.`,
  
  // Templates with only target
  `Mình học tại PTE Intensive và đã đạt được {{target}}. Giảng viên dạy rất dễ hiểu, tận tâm và luôn hỗ trợ học viên hết mình.`,
  
  `Trước đây mình chỉ đặt mục tiêu {{target}}, nhưng nhờ học tại PTE Intensive, mình đã đạt được điểm mong muốn.`,
  
  `PTE Intensive có phương pháp giảng dạy rất hiệu quả. Mình đã đạt được {{target}} chỉ sau một thời gian ngắn.`,
  
  `Mình rất hài lòng khi học tại PTE Intensive. Giảng viên đã giúp mình đạt được {{target}}. Họ rất nhiệt tình và luôn sẵn sàng giải đáp mọi thắc mắc.`,
  
  `PTE Intensive thực sự đáng giá. Giảng viên đã giúp mình đạt được {{target}} một cách dễ dàng.`,
  
  // Generic templates (no placeholders)
  `Mình học tại PTE Intensive và rất hài lòng với kết quả đạt được. Giảng viên dạy rất dễ hiểu, tận tâm và luôn hỗ trợ học viên hết mình.`,
  
  `PTE Intensive có phương pháp giảng dạy rất hiệu quả. Mình đã tiến bộ rất nhiều sau khi hoàn thành khóa học.`,
  
  `Mình rất hài lòng khi học tại PTE Intensive. Giảng viên rất nhiệt tình và luôn sẵn sàng giải đáp mọi thắc mắc.`,
  
  `PTE Intensive thực sự đáng giá. Phương pháp giảng dạy rất hiệu quả và dễ áp dụng.`,
  
  `Mình đã thử nhiều trung tâm nhưng chỉ có PTE Intensive mới giúp mình tiến bộ nhanh chóng. Các khóa học được thiết kế rất khoa học và hiệu quả.`
];

// Function to get templates based on available information
export const getFilteredTemplates = (
  hasTeacherName: boolean,
  hasCourseName: boolean,
  hasTarget: boolean
): string[] => {
  if (hasTeacherName && hasCourseName && hasTarget) {
    // All information available - use templates with all placeholders
    return reviewTemplates.slice(0, 10);
  } else if (hasTeacherName && hasCourseName && !hasTarget) {
    // No target - use templates without target
    return reviewTemplates.slice(10, 15);
  } else if (hasTeacherName && !hasCourseName && hasTarget) {
    // No course name - use templates without course name
    return reviewTemplates.slice(15, 20);
  } else if (!hasTeacherName && hasCourseName && hasTarget) {
    // No teacher name - use templates without teacher name
    return reviewTemplates.slice(20, 25);
  } else if (hasTeacherName && !hasCourseName && !hasTarget) {
    // Only teacher name - use templates with only teacher name
    return reviewTemplates.slice(25, 30);
  } else if (!hasTeacherName && hasCourseName && !hasTarget) {
    // Only course name - use templates with only course name
    return reviewTemplates.slice(30, 35);
  } else if (!hasTeacherName && !hasCourseName && hasTarget) {
    // Only target - use templates with only target
    return reviewTemplates.slice(35, 40);
  } else {
    // No information - use generic templates
    return reviewTemplates.slice(40, 45);
  }
};

// Function to get a random template based on available information
export const getRandomTemplate = (
  teacherName?: string,
  courseName?: string,
  target?: string
): string => {
  const hasTeacherName = !!teacherName && teacherName.trim() !== '';
  const hasCourseName = !!courseName && courseName.trim() !== '';
  const hasTarget = !!target && target.trim() !== '';
  
  const filteredTemplates = getFilteredTemplates(hasTeacherName, hasCourseName, hasTarget);
  const randomIndex = Math.floor(Math.random() * filteredTemplates.length);
  
  let template = filteredTemplates[randomIndex];
  
  // Replace placeholders with actual values or defaults
  if (hasTeacherName) {
    template = template.replace(/{{teacherName}}/g, teacherName);
  }
  
  if (hasCourseName) {
    template = template.replace(/{{courseName}}/g, courseName);
  }
  
  if (hasTarget) {
    template = template.replace(/{{target}}/g, target);
  }
  
  return template;
};
