package com.habitTool.habitTool.service.Impl;

import com.habitTool.habitTool.domain.Habit;
import com.habitTool.habitTool.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;

    @Override
    public void sendEmailActivation(String to, String link) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Activate your account");
        message.setText("Click this link to activate your account: " + link);
        javaMailSender.send(message);
    }

    @Override
    public void sendEmailReminder(String to, Habit habit) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject("⏰ Reminder: " + habit.getTitle());
            helper.setText(buildEmailHtml(habit), true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email reminder", e);
        }
    }

    private String buildEmailHtml(Habit habit) {
        String frequencyLabel = habit.getFrequency()   != null ? habit.getFrequency().name()      : "—";
        String reminderTime   = habit.getReminder()    != null ? habit.getReminder().toString()   : "—";
        String startDate      = habit.getStartDate()   != null ? habit.getStartDate().toString()  : "—";
        String endDate        = habit.getEndDate()     != null ? habit.getEndDate().toString()    : "—";
        int    targetCount    = habit.getTargetCount() != null ? habit.getTargetCount()           : 0;

        return """
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Habit Reminder</title>
        </head>
        <body style="margin:0;padding:0;background:#F0F4FF;font-family:'Segoe UI',Arial,sans-serif;">

          <table width="100%%" cellpadding="0" cellspacing="0" style="background:#F0F4FF;padding:40px 0;">
            <tr><td align="center">

              <table width="560" cellpadding="0" cellspacing="0"
                     style="background:#ffffff;border-radius:16px;overflow:hidden;
                            box-shadow:0 4px 24px rgba(99,102,241,0.10);">

                <tr>
                  <td style="background:linear-gradient(135deg,#6366F1 0%%,#8B5CF6 100%%);
                              padding:36px 40px 28px;text-align:center;">
                    <div style="font-size:36px;margin-bottom:8px;">🎯</div>
                    <p style="margin:0;color:rgba(255,255,255,0.75);font-size:12px;
                               letter-spacing:2px;text-transform:uppercase;font-weight:600;">
                      Daily Habit Reminder
                    </p>
                    <h1 style="margin:8px 0 0;color:#ffffff;font-size:26px;font-weight:700;
                                letter-spacing:-0.3px;">
                      %s
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding:36px 40px 24px;">
                    <p style="margin:0 0 24px;color:#64748B;font-size:14px;line-height:1.6;">
                      Time to work on your habit! Here's a quick overview to keep you on track.
                    </p>

                    <table width="100%%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="48%%" style="background:#F8F7FF;border-radius:12px;
                                                padding:16px 20px;border-left:3px solid #6366F1;">
                          <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;
                                     text-transform:uppercase;letter-spacing:1px;font-weight:600;">
                            Frequency
                          </p>
                          <p style="margin:0;font-size:16px;color:#1E1B4B;font-weight:700;">%s</p>
                        </td>
                        <td width="4%%"></td>
                        <td width="48%%" style="background:#F8F7FF;border-radius:12px;
                                                padding:16px 20px;border-left:3px solid #8B5CF6;">
                          <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;
                                     text-transform:uppercase;letter-spacing:1px;font-weight:600;">
                            Reminder Time
                          </p>
                          <p style="margin:0;font-size:16px;color:#1E1B4B;font-weight:700;">%s</p>
                        </td>
                      </tr>
                      <tr><td colspan="3" style="height:12px;"></td></tr>
                      <tr>
                        <td width="48%%" style="background:#F8F7FF;border-radius:12px;
                                                padding:16px 20px;border-left:3px solid #06B6D4;">
                          <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;
                                     text-transform:uppercase;letter-spacing:1px;font-weight:600;">
                            Target Count
                          </p>
                          <p style="margin:0;font-size:16px;color:#1E1B4B;font-weight:700;">
                            %d times
                          </p>
                        </td>
                        <td width="4%%"></td>
                        <td width="48%%">
                          <div style="background:#F8F7FF;border-radius:12px;padding:16px 20px;
                                      border-left:3px solid #10B981;">
                            <p style="margin:0 0 4px;font-size:11px;color:#9CA3AF;
                                       text-transform:uppercase;letter-spacing:1px;font-weight:600;">
                              Duration
                            </p>
                            <p style="margin:0;font-size:13px;color:#1E1B4B;font-weight:600;">
                              %s → %s
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div style="margin-top:28px;text-align:center;">
                      <a href="#"
                         style="display:inline-block;background:linear-gradient(135deg,#6366F1,#8B5CF6);
                                color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;
                                padding:14px 36px;border-radius:50px;
                                box-shadow:0 4px 14px rgba(99,102,241,0.35);">
                        ✓ Mark as Done
                      </a>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 40px 28px;text-align:center;border-top:1px solid #F1F5F9;">
                    <p style="margin:0;color:#CBD5E1;font-size:11px;">
                      You're receiving this because you set a reminder for this habit.<br/>
                      Keep going — consistency is the key to success! 💪
                    </p>
                  </td>
                </tr>

              </table>

            </td></tr>
          </table>

        </body>
        </html>
        """.formatted(
                habit.getTitle(),
                frequencyLabel,
                reminderTime,
                targetCount,
                startDate,
                endDate
        );
    }
}